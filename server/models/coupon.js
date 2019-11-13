const db = require("../db/db");

const convertBooleans = e => {
  e.for_every_hotel = !!e.for_every_hotel;
  e.for_every_airline = !!e.for_every_airline;
  return e;
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
    const result = await db.query(`
      SELECT DISTINCT coupon.*
      FROM coupon LEFT JOIN coupon_criteria_level as lvl ON coupon.code = lvl.code
      WHERE ? OR (
        (? AND UPPER(coupon.code) LIKE UPPER(?)) OR
        (? AND UPPER(name) LIKE UPPER(?)) OR
        (? AND UPPER(description) LIKE UPPER(?))
      ) AND (lvl.level IN (?) OR ?)
      LIMIT ?, ?
    `, [
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
    ]);

    return result[0].map(convertBooleans);
  } catch (err) {
    throw new Error(`[ERR] findCoupons: ${err}`)
  }
};

exports.findCoupon = async code => {
  try {
    const result = await db.query("SELECT * FROM coupon WHERE code = ?", [code]);

    if (result[0].length >= 1) {
      return convertBooleans(result[0][0]);
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
  levels,
  hotels,
  airlines,
  discount_percentage,
  start_date,
  expire_date
}) => {
  try {
    await db.query("INSERT INTO coupon VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
      code,
      discount_percentage,
      creation_date,
      expire_date,
      create_by_user_id,
      start_date,
      hotels === true,
      airlines === true,
      name,
      description
    ]);

    const errHandler = async err => {
      await exports.deleteCoupon(code);
      throw err;
    };

    if (Array.isArray(hotels)) {
      await db.query("INSERT INTO coupon_criteria_hotel VALUES ?", [
        hotels.map(e => [code, e])
      ]).catch(errHandler);
    }

    if (Array.isArray(airlines)) {
      await db.query("INSERT INTO coupon_criteria_airlines VALUES ?", [
        airlines.map(e => [code, e])
      ]).catch(errHandler);
    }
  } catch (err) {
    throw new Error(`[ERR] createCoupon: ${err}`);
  }
};

exports.updateCoupon = async ({
  code,
  name,
  description,
  levels,
  hotels,
  airlines,
  discount_percentage,
  start_dte,
  end_date
}) => {

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
