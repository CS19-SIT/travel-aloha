const db = require("../db/db");

const selectStm = "a.CouponCode, v.exp, a.Discount, a.Limit";
const fromStm = " `AccommodationCoupon` as a, `validGold` as v";
const whereStm = "a.AccCouID = v.couponid";


exports.showValidCouponAc = async (user_id) => {
  const coupon = await db.execute(
    `SELECT ${selectStm} FROM ${fromStm} WHERE v.userID = ? AND ${whereStm} `, [
      user_id
    ]);
  return coupon;
};

exports.showPoints = async (user_id) => {
  const points = await db.execute(
    `SELECT Points FROM GoldLevel WHERE userID = ?`, [user_id]);
  return points;
};

// let AuthUser = function(data) {
//   return google.login(data.username, data.password).then(token => { return token } )
// }
// with placeholder
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function(err, results) {
//     console.log(results);
//   }
// );
//return stm


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
