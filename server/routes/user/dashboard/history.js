const express = require("express");
const router = express.Router();

const userDashboardController = require("../../../controllers/user/dashboard/history");
const authMiddleware = require("../../../middlewares/auth");

router.get(
  "/",
  authMiddleware.isAuthenticated,
  userDashboardController.getIndex
);

router.get(
  "/hotel",
  authMiddleware.isAuthenticated,
  userDashboardController.getHotel
);

router.get(
  "/hotel-data",
  authMiddleware.isAuthenticated,
  userDashboardController.getHotelData
);

router.get(
  "/flight",
  authMiddleware.isAuthenticated,
  userDashboardController.getFlight
);

module.exports = router;
