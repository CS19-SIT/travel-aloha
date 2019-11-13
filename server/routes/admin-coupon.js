const express = require("express");
const router = express.Router();

const adminCouponController = require("../controllers/admin-coupon");
const authMiddleware = require("../middlewares/auth");

router.get(
  "/",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminCouponController.getIndex
);

router.get(
  "/detail/:code",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminCouponController.findCoupon
);

router.post(
  "/edit",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminCouponController.editCoupon
);

router.put(
  "/new",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminCouponController.createCoupon
);

router.delete(
  "/delete",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminCouponController.deleteCoupon
);

module.exports = router;
