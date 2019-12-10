const qc = require("../models/query_coupon");


exports.getCoupon = (req, res ) => {
  // res.send("Im from controller query coupon");
  const result = qc.showValidCouponAC("AC1234");
      console.log(result);

};
