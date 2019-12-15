const express = require("express");
const router = express.Router();

const rewardController = require("../../controllers/rewardLevel/rewardController");

router.get("/", rewardController.getCoupon);

module.exports = router;