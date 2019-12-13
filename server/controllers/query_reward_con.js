const qc = require("../models/query_coupon");
const passport = require("../auth/passport");
// const User = require("../models/user");
// const passport = require("../auth/passport");


exports.getCoupon = async (req, res) => {
  // res.send("Im from controller query coupon");
  try {
    // const user_id = req.session.user.id;
    const user_id = req.user.user_id;
    console.log(user_id);
    // const result = await qc.showValidCouponAc(user_id);
    // console.log(result[0][0]);
    // res.send(result[0][0]);
  }catch(err){
    throw new Error(`ERROR on getCoupon(user_id): ${err}`);
  }
};
exports.getPoints = async (req, res) => {
  const result = await qc.showPoints();
  // console.log(result[0][1]);
  // res.send(result[0][0]);
};
