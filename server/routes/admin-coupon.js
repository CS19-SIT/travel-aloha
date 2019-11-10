const express = require("express");
const router = express.Router();

const adminCouponController = require("../controllers/admin-coupon");
const authMiddleware = require("../middlewares/auth");

router.get("/", authMiddleware.isAuthenticated, adminCouponController.getIndex);

module.exports = router;