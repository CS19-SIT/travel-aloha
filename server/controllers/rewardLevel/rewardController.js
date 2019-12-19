const rewModel = require('../../models/query_coupon');
const couModel = require('../../models/coupon');

exports.getCoupon = async (req, res) => {
  const user_id = req.user.user_id;
  const level = req.user.Level;

  const usedHocoupon = await rewModel.showHoUsedCoupon(user_id);
  const usedFlcoupon = await rewModel.showFlUsedCoupon(user_id);

  // const redeemable = await rewModel.showRedeemCoupon(level);
  // console.log(usedcoupon);

  const couponAi = await rewModel.showValidCouponAirline(req.user.user_id);
  const couponHo = await rewModel.showValidCouponHotel(req.user.user_id);

  const queryPoints = await rewModel.showTotalPoints(req.user.username);
  // console.log("im points of " +user_id+"="+queryPoints);
  // console.log("im airline coupon of " +user_id+"="+couponAi);
  // console.log("im points ohotel coupon of  " +user_id+"="+couponHo);

  const queryLevel = await rewModel.showLevel(user_id);
  // console.log("im level of " +user_id+"="+queryLevel);

//insert pictiure ofe level
  if (queryLevel == "Gold") {
    levelImg = '<img src="../assets/img/rewardLevel/Gember.png" alt="Gold_level_picture" class="memberImg">';
  } else if (queryLevel == "Silver") {
    levelImg = '<img src="../assets/img/rewardLevel/Sember.png" alt="Siller_level_picture" class="memberImg">';
  } else if (queryLevel == "Elite") {
    levelImg = '<img src="../assets/img/rewardLevel/Eember.png" alt="Elite_level_picture" class="memberImg">';
  } else {
    levelImg = '<img src="../assets/img/rewardLevel/Nember.png" alt="normal_level_picture" class="memberImg">';
  }

  // console.log(levelImg);

  res.render('rewardLevel/reward', {
    couponsA: couponAi,
    couponsH: couponHo,
    // couponsFo: queryCouponsFo,
    // couponsEn: queryCouponsEn,
    // redeemed: usedcoupon,
    point: queryPoints,
    pageTitle: "Reward",
    user: req.user.username,
    expDate: "DATE_FORMAT(`ExpDate`,'%W %D %M %Y')",
    usedCouponH: usedHocoupon,
    usedCouponA: usedFlcoupon,
    // usedCouponFl: queryUsedFl,
    // usedCouponFo: queryUsedFo,
    // usedCouponEn: queryUsedEn,
    level: queryLevel,
    img: levelImg,
    // redeemCoupon: redeemable,


  });
} // getCoupon

/////////////verifyLevel
exports.verifyLevel = async (req, res) => {
  const user_id = req.user.user_id;
  const queryTotalSpend = await rewModel.showtotalSpend(user_id);
  // console.log(queryTotalSpend);

  if (queryTotalSpend >= 10000 && queryTotalSpend < 100000) {
    rewModel.updateLevel("Siver", user_id);
  } else if (queryTotalSpend >= 100000 && queryTotalSpend < 500000) {
    rewModel.updateLevel("Gold", user_id);
  } else if (queryTotalSpend >= 500000) {
    rewModel.updateLevel("Elite", user_id);
  } else {
    rewModel.updateLevel("Normal", user_id);
  }
};
exports.useCoupon = async (req, res) => {
  const user_id = req.user.user_id;
  const code = req.params.code;
  try {
    await couModel.redeemCoupon(code, user_id);
    await rewModel.deletePersonalCoupon(code);
  } catch (err) {
    console.log(err);
  }

};
