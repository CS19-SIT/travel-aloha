const express = require("express");
const router = express.Router();

const adminCouponController = require("../controllers/admin-coupon");
const authMiddleware = require("../middlewares/auth");

router.get("/", authMiddleware.isAuthenticated, adminCouponController.getIndex);
router.get("/", authMiddleware.isAuthenticated, adminCouponController.createCoupon);
router.get("/", authMiddleware.isAuthenticated, adminCouponController.editCoupon);
router.get("/", authMiddleware.isAuthenticated, adminCouponController.deleteCoupon);
router.get("/", authMiddleware.isAuthenticated, adminCouponController.searchCoupon);
router.get("/", authMiddleware.isAuthenticated, adminCouponController.generateCouponCode);

module.exports = router;