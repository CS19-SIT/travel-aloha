const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const authMiddleware = require("../middlewares/auth");

// router.get("/rewardLevel/rewardLevel", authController.getRegister);
router.get('/', function(req,res){
    res.render('rewardLevel/reward',{
        pagetitle: 'TravelAloha:Reward',
        user: req.user
    });
});

module.exports = router;