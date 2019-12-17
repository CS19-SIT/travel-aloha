const rewModel = require('../../models/query_coupon');



exports.getCoupon =  async (req, res) => {
    const user_id = req.user.user_id;
    const queryCouponsAc = await rewModel.showValidCouponAc(user_id);
    const queryCouponsFl = await rewModel.showValidCouponFl(user_id);
    const queryCouponsFo = await rewModel.showValidCouponFo(user_id);
    const queryCouponsEn = await rewModel.showValidCouponEn(user_id);

    const queryUsedAc = await rewModel.showUsedCouponAc(user_id);
    const queryUsedFl = await rewModel.showUsedCouponFl(user_id);
    const queryUsedFo = await rewModel.showUsedCouponFo(user_id);
    const queryUsedEn = await rewModel.showUsedCouponEn(user_id);
    
    const queryPoints = await rewModel.showPoints(user_id);

    const queryLevel = await rewModel.showLevel(user_id);
    console.log(queryLevel);
    
    if(queryLevel == "Gold") {
        levelImg = '<img src="../assets/img/rewardLevel/Gember.png" alt="Gold_level_picture" class="memberImg">';
    }else if (queryLevel == "Normal") {
        levelImg = '<img src="../assets/img/rewardLevel/Nember.png" alt="normal_level_picture" class="memberImg">';
    }else if (queryLevel == "Elite") {
        levelImg = '<img src="../assets/img/rewardLevel/Eember.png" alt="Elite_level_picture" class="memberImg">';
    } else {
        levelImg = '<img src="../assets/img/rewardLevel/Sember.png" alt="Siller_level_picture" class="memberImg">';
    }

    console.log(levelImg);

    res.render('rewardLevel/reward', {
      couponsAC: queryCouponsAc,
      couponsFl: queryCouponsFl,
      couponsFo: queryCouponsFo,
      couponsEn: queryCouponsEn,
      point: queryPoints,
      pageTitle: "Reward",
      user: req.user.username,
      expDate: "DATE_FORMAT(`ExpDate`,'%W %D %M %Y')",
      usedDate: "DATE_FORMAT(`usedDate`,'%W %D %M %Y')",
      usedCouponAc: queryUsedAc,
      usedCouponFl: queryUsedFl,
      usedCouponFo: queryUsedFo,
      usedCouponEn: queryUsedEn,
      level: queryLevel,
      img: levelImg
      
    });
    
}
