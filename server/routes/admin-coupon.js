const express = require("express");
const router = express.Router();

const adminCouponController = require("../controllers/admin-coupon");
const authMiddleware = require("../middlewares/auth");

router.get("/", authMiddleware.isAuthenticated, adminCouponController.getIndex);
router.put("/new", authMiddleware.isAuthenticated, adminCouponController.createCoupon);
router.post("/edit", authMiddleware.isAuthenticated, adminCouponController.editCoupon);
router.delete("/delete", authMiddleware.isAuthenticated, adminCouponController.deleteCoupon);
router.get("/detail", authMiddleware.isAuthenticated, adminCouponController.findCoupon);

module.exports = router;