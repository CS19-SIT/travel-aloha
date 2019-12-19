const db = require("../db/db");

//valid coupon from each coupon type and coupon_personal_user

exports.showValidCouponAirline = async (user_id) => {

  const couponAirline = await db.query("SELECT * FROM `airline`, `coupon` as c,`coupon_criteria_airline` as a, `coupon_personal_user` as p WHERE p.user_id = ? AND a.code = p.code  AND a.code = c.code AND airline.airline_Id = a.airline_id", [
    user_id
  ]);
  if (couponAirline) {
    return couponAirline[0];
  } else {
    return "You dont have any coupon Airline";
  }
};

exports.showValidCouponHotel = async (user_id) => {
  const couponHotel = await db.query("SELECT * FROM `hotel`, `coupon` as c ,`coupon_criteria_hotel` as h, `coupon_personal_user` as p WHERE p.user_id = ? AND h.code = p.code AND h.code = c.code AND hotel.hotelId = h.hotel_id", [
    user_id
  ]);
  return couponHotel[0];
};

// //query used coupon
// exports.showUsedCouponAc = async (user_id) => {
//   const coupon = await db.query("SELECT a.CouponCode, DATE_FORMAT(`usedDate`,'%W %D %M %Y') FROM `AccommodationCoupon` as a,`AccUsedCoupon` as u WHERE u.userID = ? AND (a.AccCouID = u.couponID)", [
//       user_id ]);
//     console.log(user_id);
//   return coupon[0];
// };
// exports.showUsedCouponFl = async (user_id) => {
//   const coupon = await db.query("SELECT a.CouponCode, DATE_FORMAT(`usedDate`,'%W %D %M %Y') FROM `FlightCoupon_copy` as a,`FliUsedCoupon` as u WHERE u.userID = ? AND (a.FliCouID  = u.couponID)", [
//       user_id ]);
//
//   return coupon[0];
// };
exports.showHoUsedCoupon = async (user_id) => {
  const coupon = await db.query("SELECT * FROM `hotel`, `coupon_redeemed` as r, `coupon_criteria_hotel` as h WHERE r.user_id = ? AND h.code = r.code AND hotel.hotelId = h.hotel_id", [
      user_id ]);

  return coupon[0];
};

exports.showFlUsedCoupon = async (user_id) => {
  const coupon = await db.query("SELECT * FROM  `airline`, `coupon_criteria_airline` as a, `coupon_redeemed` as r WHERE r.user_id = ? AND a.code = r.code AND airline.airline_Id = a.airline_id", [
      user_id ]);

  return coupon[0];
};

//valid coupon from coupon_personal_user (all)
// exports.showValidCoupon = async (user_id) => {
//   const coupon = await db.query("SELECT  FROM  WHERE u.userID = ? ", [
//       user_id ]);
//
//   return coupon[0];
// };
//Points of user
exports.showTotalPoints = async (username) => {
  const points = await db.query(`SELECT SUM(earnPoint) FROM HotelTransaction WHERE username = ?`, [username]);
  return points[0][0]["SUM(earnPoint)"];
};


//level
exports.showLevel = async (user_id) => {
  const level = await db.query(`SELECT Level FROM user WHERE user_id = ?`, [user_id]);
  return level[0][0].Level;
};
exports.updateLevel = async (level, user_id) => {
  const userLevel = await db.update("UPDATE user SET user.Level = ? WHERE user_id = ?  ", [level, user_id]);
}

//redeem
// exports.showRedeemCoupon = async (level) => {
//   const redeem = db.query("SELECT * FROM redeemable_coupon WHERE level = ? ", [level]);
//   return level;
// };

exports.showtotalSpend = async (user_id) => {
  const total = await db.query(`SELECT SUM(h.totalPrice) FROM HotelTransaction as h, user as u WHERE user_id = ? AND h.user_id = u.user_id `, [user_id]);
  return total[0][0];
};

// delete using coupon from coupon_personal_user
exports.deleteRedeemCoupon = async code => {
  try {
    if (!(await isCouponExists(code))) {
      throw new Error(`Coupon with code '${code}' doesn't exists`);
    }

    await db.query("DELETE FROM redeemtable WHERE code = ?", [code]);
  } catch (err) {
    throw new Error(`[ERR] deleteCoupon: ${err}`);
  }
};
