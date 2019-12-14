const db = require("../db/db");

//valid coupon from each coupon type
exports.showValidCouponAc = async (user_id) => {
  const coupon = await db.query("SELECT a.CouponCode, DATE_FORMAT(`ExpDate`,'%W %D %M %Y'), a.Discount, a.Limit FROM `AccommodationCoupon` as a, `AccValidCoupon` as v WHERE v.userID = ? AND (a.AccCouID = v.couponID)", [
      user_id ]);
    console.log(user_id);
  return coupon[0];
};

exports.showValidCouponFl = async (user_id) => {
  const coupon = await db.query("SELECT a.CouponCode, DATE_FORMAT(`ExpDate`,'%W %D %M %Y'), a.Discount, a.Limit FROM `FlightCoupon_copy` as a, `FliValidCoupon` as v WHERE v.userID = ? AND (a.FliCouID = v.couponID)", [
      user_id ]);

  return coupon[0];
};

exports.showValidCouponFo = async (user_id) => {
  const coupon = await db.query("SELECT a.CouponCode, DATE_FORMAT(`ExpDate`,'%W %D %M %Y'), a.Discount, a.Limit FROM `FoodCoupon` as a, `FooValidCoupon` as v WHERE v.userID = ? AND (a.FooCouID = v.couponID)", [
      user_id ]);

  return coupon[0];
};

exports.showValidCouponEn = async (user_id) => {
  const coupon = await db.query("SELECT a.CouponCode, DATE_FORMAT(`ExpDate`,'%W %D %M %Y'), a.Discount, a.Limit FROM `EntertainmentCoupon` as a, `EntValidCoupon` as v WHERE v.userID = ? AND (a.EntCouID = v.couponID)", [
      user_id ]);

  return coupon[0];
};


//query used coupon
exports.showUsedCouponAc = async (user_id) => {
  const coupon = await db.query("SELECT a.CouponCode, DATE_FORMAT(`usedDate`,'%W %D %M %Y') FROM `AccommodationCoupon` as a,`AccUsedCoupon` as u WHERE u.userID = ? AND (a.AccCouID = u.couponID)", [
      user_id ]);
    console.log(user_id);
  return coupon[0];
};

exports.showUsedCouponFl = async (user_id) => {
  const coupon = await db.query("SELECT a.CouponCode, DATE_FORMAT(`usedDate`,'%W %D %M %Y') FROM `FlightCoupon_copy` as a,`FliUsedCoupon` as u WHERE u.userID = ? AND (a.FliCouID  = u.couponID)", [
      user_id ]);

  return coupon[0];
};

exports.showUsedCouponFo = async (user_id) => {
  const coupon = await db.query("SELECT a.CouponCode, DATE_FORMAT(`usedDate`,'%W %D %M %Y') FROM `FoodCoupon` as a,`FooUsedCoupon` as u WHERE u.userID = ? AND (a.FooCouID = u.couponID)", [
      user_id ]);

  return coupon[0];
};

exports.showUsedCouponEn = async (user_id) => {
  const coupon = await db.query("SELECT a.CouponCode, DATE_FORMAT(`usedDate`,'%W %D %M %Y') FROM `EntertainmentCoupon` as a,`EntUsedCoupon` as u WHERE u.userID = ? AND (a.EntCouID = u.couponID)", [
      user_id ]);

  return coupon[0];
};

//Points of user
exports.showPoints = async (user_id) => {
  const points = await db.query(`SELECT point FROM user WHERE user_id = ?`, [user_id]);
  return points[0][0].point;
};




// exports.showValidCouponFl = async LevelID => {
//   const flcoupon =  db.query("SELECT CouponCode FROM ValidCoupon as v, FlightCoupon_copy as f WHERE v.couponID = f.FlCouID AND user_ID = ?",
//  [LevelID]);
// };
// exports.showValidCouponEn = async LevelID => {
//   const encoupon =  db.query("SELECT CouponCode FROM ValidCoupon as v , EntertainmentCoupon as e WHERE v.couponID = e.EntCouID AND user_ID = ?",
//  [LevelID]);
// };
// exports.showValidCouponFo = async LevelID => {
//   const focoupon =  db.query("SELECT CouponCode FROM ValidCoupon as v, FoodCoupon as fo WHERE v.couponID = fo.FoCouID AND user_ID = ?",
//  [LevelID]);
// };
