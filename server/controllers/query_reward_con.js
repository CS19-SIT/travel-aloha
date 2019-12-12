const qc = require("../models/query_coupon");


exports.getCoupon = async (req, res ) => {
  // res.send("Im from controller query coupon");
    let result = await qc.showValidCouponAC("AC1234");
    console.log(result);


};
