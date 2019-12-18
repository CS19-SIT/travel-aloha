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

const addCouponUserPromotion = async (code, users) => {
  if (users.length > 0) {
    return db.query("INSERT INTO coupon_personal_user VALUES ?", [
      users.map(e => [code, e])
    ]);
  }
}

const addCouponMaxCount = async (code, count) => {
  return db.query("INSERT INTO coupon_most_used VALUES (?, ?)", [code, count]);
}

const getCouponCriteriaHotel = async (code, additionalData = false) => {
  if (additionalData) {
    return await db.query(`
      SELECT c.hotel_id AS id, e.hotelName AS name
      FROM coupon_criteria_hotel AS c, hotel AS e
      WHERE c.code = ? AND c.hotel_id = e.hotelId
    `, [code]).then(r => r[0]);
  } else {
    return await db.query(`
      SELECT hotel_id AS id
      FROM coupon_criteria_hotel
      WHERE code = ?
    `, [code]).then(r => r[0].map(e => e['id']));
  }
};

const getCouponCriteriaAirline = async (code, additionalData = false) => {
  if (additionalData) {
    return await db.query(`
      SELECT c.airline_id AS id, e.airlineName AS name
      FROM coupon_criteria_airline AS c, airline AS e
      WHERE c.code = ? AND c.airline_id = e.airline_Id
    `, [code]).then(r => r[0]);
  } else {
    return await db.query(`
      SELECT airline_id AS id
      FROM coupon_criteria_airline
      WHERE code = ?
    `, [code]).then(r => r[0].map(e => e['id']));
  }
};

const getCouponCriteriaLevel = async code => {
  const result = await db.query("SELECT level FROM coupon_criteria_level WHERE code = ?", [code]);
  return result[0].map(e => e["level"]);
};

const getCouponUserPromotion = async (code, additionalData = false) => {
  if (additionalData) {
    return await db.query(`
      SELECT c.user_id AS id, e.username AS name
      FROM coupon_personal_user AS c, user AS e
      WHERE c.code = ? AND c.user_id = e.user_id
    `, [code]).then(r => r[0]);
  } else {
    return await db.query(`
      SELECT user_id AS id
      FROM coupon_personal_user
      WHERE code = ?
    `, [code]).then(r => r[0].map(e => e['id']));
  }
};

const mergeWithRelatedData = async (e, additionalData = false) => {
  if (!e.for_every_hotel) {
    e.hotels = await getCouponCriteriaHotel(e.code, additionalData);
  }

  if (!e.for_every_airline) {
    e.airlines = await getCouponCriteriaAirline(e.code, additionalData);
  }

  e.levels = await getCouponCriteriaLevel(e.code);
  e.users = await getCouponUserPromotion(e.code, additionalData);
  
  if (!(await exports.isCouponUnlimited(e.code))) {
    e.max_count = await exports.getCouponMaxCount(e.code);
  }

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
    const tokenize = str => {
      if (str == null) {
        return [];
      }

      let buf = "";
      let result = [];
      for (c of str) {
        if (/\s/.test(c)) {
          if (buf != "") {
            result.push(buf);
            buf = "";
          }
        } else {
          buf += c;
        }
      }

      if (buf != "") {
        result.push(buf);
      }

      return result;
    }

    const codeTokens = tokenize(code);
    const nameTokens = tokenize(name);
    const descriptionTokens = tokenize(description);

    const params = [
      codeTokens.length == 0 && nameTokens.length == 0 && descriptionTokens.length == 0,

      ...codeTokens,
      ...nameTokens,
      ...descriptionTokens,

      levels,
      levels == null,

      page * entriesPerPage,
      entriesPerPage,
    ];

    const genLikeQuery = (field, n) => {
      if (n <= 0) {
        return "FALSE";
      }

      let concat = "?" + ", '|', ?".repeat(n - 1);
      return `UPPER(${field}) REGEXP UPPER(CONCAT(${concat}))`;
    };

    const baseQuery = `
      SELECT DISTINCT coupon.*
      FROM coupon LEFT JOIN coupon_criteria_level as lvl ON coupon.code = lvl.code
      WHERE ? OR (
        ${genLikeQuery("coupon.code", codeTokens.length)} OR
        ${genLikeQuery("name", nameTokens.length)} OR
        ${genLikeQuery("description", descriptionTokens.length)}
      ) AND (lvl.level IN (?) OR ?)
    `;

    const countResult = await db.query(`
      SELECT COUNT(*) AS couponCount
      FROM (${baseQuery}) AS t
    `, params);

    const dataResult = await db.query(`
      ${baseQuery}
      ORDER BY coupon.creation_date DESC
      LIMIT ?, ?
    `, params);

    return {
      pageCount: Math.ceil(countResult[0][0]["couponCount"] / entriesPerPage),
      coupons: await Promise.all(dataResult[0].map(convertFromDB).map(e => mergeWithRelatedData(e, true)))
    };
  } catch (err) {
    throw new Error(`[ERR] searchCoupons: ${err}`)
  }
};

exports.getCoupon = async code => {
  try {
    const result = await db.query("SELECT * FROM coupon WHERE code = ?", [code]);

    if (result[0].length >= 1) {
      return mergeWithRelatedData(convertFromDB(result[0][0]));
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
  users,
  discount_percentage,
  start_date,
  expire_date,
  max_count,
  min_purchase = 0
}) => {
  try {
    if (await isCouponExists(code)) {
      throw new Error(`Coupon with code '${code}' already existed`);
    }

    try {
      await db.query("INSERT INTO coupon VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
        code,
        discount_percentage,
        creation_date,
        expire_date,
        create_by_user_id,
        start_date,
        for_every_hotel,
        for_every_airline,
        name,
        description,
        min_purchase
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

      if (Array.isArray(users)) {
        await addCouponUserPromotion(code, users);
      }

      if (max_count != null) {
        await addCouponMaxCount(code, max_count);
      }
    } catch (err) {
      // Revert
      await exports.deleteCoupon(code, false);
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
  creation_date,
  create_by_user_id,
  for_every_hotel,
  for_every_airline,
  levels,
  hotels,
  airlines,
  users,
  discount_percentage,
  start_date,
  expire_date,
  max_count,
  min_purchase = 0
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
            expire_date = ?,
            min_purchase = ?
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
        min_purchase,
        oldCode
      ]);

      if (for_every_hotel || !Array.isArray(hotels)) {
        hotels = [];
      }

      if (for_every_airline || !Array.isArray(airlines)) {
        airlines = [];
      }

      if (!Array.isArray(levels)) {
        levels = [];
      }

      if (!Array.isArray(users)) {
        users = [];
      }

      {
        // Maybe we can do something else here...
        const dbData = oldCoupon.hotels || [];
        const toDelete = dbData.filter(e => hotels.indexOf(e) < 0);
        const toInsert = hotels.filter(e => dbData.indexOf(e) < 0);

        if (toDelete.length > 0)
          await db.query("DELETE FROM coupon_criteria_hotel WHERE code = ? AND hotel_id IN (?)",
            [code, toDelete]);
          
        await addCouponCriteriaHotel(code, toInsert);
      }

      {
        const dbData = oldCoupon.airlines || [];
        const toDelete = dbData.filter(e => airlines.indexOf(e) < 0);
        const toInsert = airlines.filter(e => dbData.indexOf(e) < 0);

        if (toDelete.length > 0)
          await db.query("DELETE FROM coupon_criteria_airline WHERE code = ? AND airline_id IN (?)",
            [code, toDelete]);
          
        await addCouponCriteriaAirline(code, toInsert);
      }

      {
        const dbData = oldCoupon.levels || [];
        const toDelete = dbData.filter(e => levels.indexOf(e) < 0);
        const toInsert = levels.filter(e => dbData.indexOf(e) < 0);

        if (toDelete.length > 0)
          await db.query("DELETE FROM coupon_criteria_level WHERE code = ? AND level IN (?)",
            [code, toDelete]);
        
        await addCouponCriteriaLevel(code, toInsert);
      }
      
      {
        const dbData = oldCoupon.users || [];
        const toDelete = dbData.filter(e => users.indexOf(e) < 0);
        const toInsert = users.filter(e => dbData.indexOf(e) < 0);

        if (toDelete.length > 0)
          await db.query("DELETE FROM coupon_personal_user WHERE code = ? AND user_id IN (?)",
            [code, toDelete]);
          
        await addCouponUserPromotion(code, toInsert);
      }

      if (await exports.isCouponUnlimited(code)) {
        if (max_count != null) {
          await addCouponMaxCount(code, max_count);
        }
      } else {
        if (max_count == null) {
          await db.query("DELETE FROM coupon_most_used WHERE code = ?", [code]);
        } else {
          await db.query("UPDATE coupon_most_used SET amount = ? WHERE code = ?", [max_count, code]);
        }
      }
    } catch (err) {
      if (!noRevert) {
        // Revert
        await exports.editCoupon(code, oldCoupon, true);
      }
      throw err;
    }

    if (creation_date != null) {
      await db.query("INSERT INTO coupon_edit_log VALUES (?, ?, ?)", [code, creation_date, create_by_user_id]);
    }
  } catch (err) {
    throw new Error(`[ERR] editCoupon: ${err}`);
  }
};

exports.deleteCoupon = async (code, checkExistence = true) => {
  try {
    if (checkExistence && !(await isCouponExists(code))) {
      throw new Error(`Coupon with code '${code}' doesn't exists`);
    }

    await db.query("DELETE FROM coupon WHERE code = ?", [code]);
  } catch (err) {
    throw new Error(`[ERR] deleteCoupon: ${err}`);
  }
};

exports.redeemCoupon = async (code, user_id) => {
  try {
    if (await exports.isCouponRedeemedByUser(code, user_id)) {
      throw new Error(`User with id '${user_id}' already redeemed this coupon (code: '${code}')`);
    }

    if (!(await isCouponExists(code))) {
      throw new Error(`Coupon with code '${code}' doesn't exists`);
    }

    if (!(await exports.isCouponUnlimited(code)) && await exports.getCouponMaxCount(code) <= 0) {
      throw new Error(`Coupon with code '${code}' already exceeded maximum redeem count`);
    }

    await db.query("INSERT INTO coupon_redeemed VALUES (?, ?)", [code, user_id]);
    await exports.decrementCouponMaxCount(code);
  } catch (err) {
    throw new Error(`[ERR] redeemCoupon: ${err}`);
  }
}

exports.isCouponRedeemedByUser = async (code, user_id) => {
  try {
    const result = await db.query("SELECT 1 FROM coupon_redeemed WHERE code = ? AND user_id = ?", [code, user_id]);
    return result[0].length > 0;
  } catch (err) {
    throw new Error(`[ERR] isCouponRedeemedByUser: ${err}`);
  }
}

exports.isCouponUnlimited = async code => {
  try {
    return db.query("SELECT 1 FROM coupon_most_used WHERE code = ?", [code]).then(r => r[0].length == 0);
  } catch (err) {
    throw new Error(`[ERR] isCouponUnlimited: ${err}`);
  }
}

exports.getCouponMaxCount = async code => {
  try {
    return db.query("SELECT amount AS c FROM coupon_most_used WHERE code = ?", [code]).then(r => r[0][0]["c"]);
  } catch (err) {
    throw new Error(`[ERR] getCouponMaxCount: ${err}`);
  }
}

exports.decrementCouponMaxCount = async code => {
  try {
    return db.query("UPDATE coupon_most_used SET amount = amount - 1 WHERE code = ?", [code])
      .then(r => r[0]["c"]);
  } catch (err) {
    throw new Error(`[ERR] decrementCouponMaxCount: ${err}`);
  }
}