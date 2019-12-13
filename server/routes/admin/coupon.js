const express = require("express");
const router = express.Router();

const adminCouponController = require("../../controllers/admin/coupon");
const authMiddleware = require("../../middlewares/auth");

router.get(
  "/:page(\\d+)?",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminCouponController.getIndex
);

router.get(
  "/detail/:code",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminCouponController.getCoupon
);

router.post(
  "/edit/:code",
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
  "/delete/:code",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminCouponController.deleteCoupon
);

router.get(
  "/search/hotel",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminCouponController.searchHotelFormOptions
)

router.get(
  "/search/airline",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminCouponController.searchAirlineFormOptions
)

router.get(
  "/search/user",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminCouponController.searchUser
)

module.exports = router;
