const db = require("../db/db");

exports.showValidCouponAC = async AccCouID => {
  const accoupon =  db.query("SELECT * FROM AccommodationCoupon WHERE AccCouID = ?",
 [AccCouID]);
 //return stm
};

exports.showValidCouponFl = async LevelID => {
  const flcoupon =  db.query("SELECT CouponCode FROM ValidCoupon as v, FlightCoupon_copy as f WHERE v.couponID = f.FlCouID AND user_ID = ?",
 [LevelID]);
};
exports.showValidCouponEn = async LevelID => {
  const encoupon =  db.query("SELECT CouponCode FROM ValidCoupon as v , EntertainmentCoupon as e WHERE v.couponID = e.EntCouID AND user_ID = ?",
 [LevelID]);
};
exports.showValidCouponFo = async LevelID => {
  const focoupon =  db.query("SELECT CouponCode FROM ValidCoupon as v, FoodCoupon as fo WHERE v.couponID = fo.FoCouID AND user_ID = ?",
 [LevelID]);
};
