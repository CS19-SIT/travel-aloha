const qc = require("../models/query_coupon");
const passport = require("../auth/passport");
// const User = require("../models/user");
// const passport = require("../auth/passport");


exports.getvalidCoupon = async (req, res) => {
  // res.send("Im from controller query coupon");
  try {
    // const user_id = req.session.user.id;
    const user_id = req.user.user_id;
    // console.log(user_id);
    const result = await qc.showValidCouponAc(user_id);
    res.send(result);


  }catch(err){
    throw new Error(`ERROR on getCoupon(user_id): ${err}`);
  }
};
exports.getPoints = async (req, res) => {
  const user_id = req.user.user_id;
  const result = await qc.showPoints(user_id);
  // console.log(result[0][1]);
  const points = result[0][0];
};
