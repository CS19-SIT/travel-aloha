const db = require("../db/db");

const convertFromDB = e => {
  e.for_every_hotel = !!e.for_every_hotel;
  e.for_every_airline = !!e.for_every_airline;
  e.start_date = e.start_date == null ? null : new Date(e.start_date);
  e.expire_date = e.expire_date == null ? null : new Date(e.expire_date);
  e.creation_date = e.creation_date == null ? null : new Date(e.creation_date);
  return e;
};

const addCouponCriteriaHotel = async (code, hotels) => {
  if (hotels.length > 0) {
    return db.query("INSERT INTO coupon_criteria_hotel VALUES ?", [
      hotels.map(e => [code, e])
    ]);
  }
};

const addCouponCriteriaAirline = async (code, airlines) => {
  if (airlines.length > 0) {
    return db.query("INSERT INTO coupon_criteria_airline VALUES ?", [
      airlines.map(e => [code, e])
    ]);
  }
};

const addCouponCriteriaLevel = async (code, levels) => {
  if (levels.length > 0) {
    return db.query("INSERT INTO coupon_criteria_level VALUES ?", [
      levels.map(e => [code, e])
    ]);
  }
};

const getCouponCriteriaHotel = async code => {
  const result = await db.query("SELECT hotel_id FROM coupon_criteria_hotel WHERE code = ?", [code]);
  return result[0].map(e => e["hotel_id"]);
};

const getCouponCriteriaAirline = async code => {
  const result = await db.query("SELECT airline_id FROM coupon_criteria_airline WHERE code = ?", [code]);
  return result[0].map(e => e["airline_id"]);
};

const getCouponCriteriaLevel = async code => {
  const result = await db.query("SELECT level FROM coupon_criteria_level WHERE code = ?", [code]);
  return result[0].map(e => e["level"]);
};

const mergeWithCriteria = async e => {
  if (!e.for_every_hotel) {
    e.hotels = await getCouponCriteriaHotel(e.code);
  }

  if (!e.for_every_airline) {
    e.airlines = await getCouponCriteriaAirline(e.code);
  }

  e.levels = await getCouponCriteriaLevel(e.code);

  return e;
}

const isCouponExists = async code => {
  return db.query("SELECT 1 FROM coupon WHERE code = ?", [code]).then(r => r[0].length > 0);
}

exports.searchCoupons = async ({
  code,
  name,
  description,
  levels,
  page = 0,
  entriesPerPage = 10
} = {}) => {
  try {
    const params = [
      code == null && name == null && description == null,

      code != null,
      `%${code}%`,

      name != null,
      `%${name}%`,

      description != null,
      `%${description}%`,

      levels,
      levels == null,

      page * entriesPerPage,
      (page + 1) * entriesPerPage,
    ];

    // Yikes.
    const countResult = await db.query(`
      SELECT COUNT(*) AS couponCount
      FROM (
        SELECT DISTINCT coupon.*
        FROM coupon LEFT JOIN coupon_criteria_level as lvl ON coupon.code = lvl.code
        WHERE ? OR (
          (? AND UPPER(coupon.code) LIKE UPPER(?)) OR
          (? AND UPPER(name) LIKE UPPER(?)) OR
          (? AND UPPER(description) LIKE UPPER(?))
        ) AND (lvl.level IN (?) OR ?)
      ) AS t
    `, params);

    const dataResult = await db.query(`
      SELECT DISTINCT coupon.*
      FROM coupon LEFT JOIN coupon_criteria_level as lvl ON coupon.code = lvl.code
      WHERE ? OR (
        (? AND UPPER(coupon.code) LIKE UPPER(?)) OR
        (? AND UPPER(name) LIKE UPPER(?)) OR
        (? AND UPPER(description) LIKE UPPER(?))
      ) AND (lvl.level IN (?) OR ?)
      ORDER BY coupon.creation_date DESC
      LIMIT ?, ?
    `, params);

    return {
      pageCount: Math.ceil(countResult[0][0]["couponCount"] / entriesPerPage),
      coupons: await Promise.all(dataResult[0].map(convertFromDB).map(mergeWithCriteria))
    };
  } catch (err) {
    throw new Error(`[ERR] searchCoupons: ${err}`)
  }
};

exports.getCoupon = async code => {
  try {
    const result = await db.query("SELECT * FROM coupon WHERE code = ?", [code]);

    if (result[0].length >= 1) {
      return mergeWithCriteria(convertFromDB(result[0][0]));
    }

    throw new Error(`Coupon code '${code}' not found`);
  } catch (err) {
    throw new Error(`[ERR] findCoupon: ${err}`);
  }
};

exports.createCoupon = async ({
  code,
  name,
  description,
  creation_date,
  create_by_user_id,
  for_every_hotel,
  for_every_airline,
  levels,
  hotels,
  airlines,
  discount_percentage,
  start_date,
  expire_date
}) => {
  try {
    if (await isCouponExists(code)) {
      throw new Error(`Coupon with code '${code}' already existed`);
    }

    try {
      await db.query("INSERT INTO coupon VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
        code,
        discount_percentage,
        creation_date,
        expire_date,
        create_by_user_id,
        start_date,
        for_every_hotel,
        for_every_airline,
        name,
        description
      ]);

      if (!for_every_hotel && Array.isArray(hotels)) {
        await addCouponCriteriaHotel(code, hotels);
      }

      if (!for_every_airline && Array.isArray(airlines)) {
        await addCouponCriteriaAirline(code, airlines);
      }

      if (Array.isArray(levels)) {
        await addCouponCriteriaLevel(code, levels);
      }
    } catch (err) {
      // Revert
      await exports.deleteCoupon(code);
      throw err;
    }
  } catch (err) {
    throw new Error(`[ERR] createCoupon: ${err}`);
  }
};

exports.editCoupon = async (oldCode, {
  code,
  name,
  description,
  for_every_hotel,
  for_every_airline,
  levels,
  hotels,
  airlines,
  discount_percentage,
  start_date,
  expire_date
}, noRevert = false) => {
  try {
    if (!(await isCouponExists(oldCode))) {
      throw new Error(`Coupon with code '${oldCode}' doesn't exists`);
    }

    const oldCoupon = await exports.getCoupon(oldCode);

    try {
      await db.query(`
          UPDATE coupon
          SET
            code = ?,
            name = ?,
            description = ?,
            for_every_hotel = ?,
            for_every_airline = ?,
            discount_percentage = ?,
            start_date = ?,
            expire_date = ?
          WHERE code = ?
        `, [
        code,
        name,
        description,
        for_every_hotel,
        for_every_airline,
        discount_percentage,
        start_date,
        expire_date,
        oldCode
      ]);

      if (!for_every_hotel && Array.isArray(hotels)) {
        // Maybe we can do something else here...
        const dbData = oldCoupon.hotels || [];
        const toDelete = dbData.filter(e => hotels.indexOf(e) < 0);
        const toInsert = hotels.filter(e => dbData.indexOf(e) < 0);

        if (toDelete.length > 0)
          await db.query("DELETE FROM coupon_criteria_hotel WHERE code = ? AND hotel_id IN (?)",
            [code, toDelete]);
          
        await addCouponCriteriaHotel(code, toInsert);
      }

      if (!for_every_airline && Array.isArray(airlines)) {
        const dbData = oldCoupon.airlines || [];
        const toDelete = dbData.filter(e => airlines.indexOf(e) < 0);
        const toInsert = airlines.filter(e => dbData.indexOf(e) < 0);

        if (toDelete.length > 0)
          await db.query("DELETE FROM coupon_criteria_airline WHERE code = ? AND airline_id IN (?)",
            [code, toDelete]);
          
        await addCouponCriteriaAirline(code, toInsert);
      }

      if (Array.isArray(levels)) {
        const dbData = oldCoupon.levels || [];
        const toDelete = dbData.filter(e => levels.indexOf(e) < 0);
        const toInsert = levels.filter(e => dbData.indexOf(e) < 0);

        if (toDelete.length > 0)
          await db.query("DELETE FROM coupon_criteria_level WHERE code = ? AND level IN (?)",
            [code, toDelete]);
        
        await addCouponCriteriaLevel(code, toInsert);
      }
    } catch (err) {
      if (!noRevert) {
        // Revert
        await exports.editCoupon(code, oldCoupon, true);
      }
      throw err;
    }
  } catch (err) {
    throw new Error(`[ERR] editCoupon: ${err}`);
  }
};

exports.deleteCoupon = async code => {
  try {
    if (!(await isCouponExists(code))) {
      throw new Error(`Coupon with code '${code}' doesn't exists`);
    }

    await db.query("DELETE FROM coupon WHERE code = ?", [code]);
  } catch (err) {
    throw new Error(`[ERR] deleteCoupon: ${err}`)
  }
};
