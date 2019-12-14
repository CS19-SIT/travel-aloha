const db = require("../db/db");

const selectStm = "a.CouponCode, v.exp, a.Discount, a.Limit";
const fromStm = " `AccommodationCoupon` as a, `valicouponGollevel` as v";
const whereStm = "a.AccCouID = v.couponid";


exports.showValidCouponAc = async (user_id) => {
  const coupon = await db.query(`SELECT ${selectStm} FROM ${fromStm} WHERE v.userID = ? AND ${whereStm} `, [
      user_id
    ]);
  return coupon[0];
};

exports.showPoints = async (user_id) => {
  const points = await db.execute(`SELECT point FROM user WHERE user_id = ?`, [user_id]);
  return points;
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
