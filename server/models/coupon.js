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
  return db.query("INSERT INTO coupon_criteria_hotel VALUES ?", [
    hotels.map(e => [code, e])
  ]);
};

const addCouponCriteriaAirline = async (code, airlines) => {
  return db.query("INSERT INTO coupon_criteria_airline VALUES ?", [
    airlines.map(e => [code, e])
  ]);
};

const addCouponCriteriaLevel = async (code, levels) => {
  return db.query("INSERT INTO coupon_criteria_level VALUES ?", [
    levels.map(e => [code, e])
  ]);
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
      coupons: dataResult[0].map(convertFromDB)
    };
  } catch (err) {
    throw new Error(`[ERR] findCoupons: ${err}`)
  }
};

exports.findCoupon = async code => {
  try {
    const result = await db.query("SELECT * FROM coupon WHERE code = ?", [code]);

    if (result[0].length >= 1) {
      return convertFromDB(result[0][0]);
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
    await db.query("START TRANSACTION");

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
      await db.query("ROLLBACK");
      throw err;
    }

    await db.query("COMMIT");
  } catch (err) {
    throw new Error(`[ERR] createCoupon: ${err}`);
  }
};

exports.editCoupon = async ({
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
}) => {
  try {
    await db.query("START TRANSACTION");

    try {
      await db.query(`
          UPDATE coupon
          SET
            name = ?,
            description = ?,
            for_every_hotel = ?,
            for_every_airline = ?,
            discount_percentage = ?,
            start_date = ?,
            expire_date = ?
          WHERE code = ?
        `, [
        name,
        description,
        for_every_hotel,
        for_every_airline,
        discount_percentage,
        start_date,
        expire_date,
        code
      ]);

      if (!for_every_hotel && Array.isArray(hotels)) {
        const result = await getCouponCriteriaHotel(code);

        if (result.length > 0) {
          await addCouponCriteriaHotel(code, hotels.filter(e => result.indexOf(e) !== -1));
        }
      }

      if (!for_every_airline && Array.isArray(airlines)) {
        const result = await getCouponCriteriaAirline(code);

        if (result.length > 0) {
          await addCouponCriteriaAirline(code, airlines.filter(e => result.indexOf(e) !== -1));
        }
      }

      if (Array.isArray(levels)) {
        const result = await getCouponCriteriaLevel(code);

        if (result.length > 0) {
          await addCouponCriteriaLevel(code, levels.filter(e => result.indexOf(e) !== -1));
        }
      }
    } catch (err) {
      await db.query("ROLLBACK");
      throw err;
    }

    await db.query("COMMIT");
  } catch (err) {
    throw new Error(`[ERR] updateCoupon: ${err}`);
  }
};

exports.deleteCoupon = async code => {
  try {
    const result = await db.query("SELECT 1 FROM coupon WHERE code = ?", [code]);

    if (result[0].length === 0) {
      throw new Error(`Code ${code} doesn't exists`);
    }

    await db.query("DELETE FROM coupon WHERE code = ?", [code]);
  } catch (err) {
    throw new Error(`[ERR] deleteCoupon: ${err}`)
  }
};
