var express = require("express");
var router = express.Router();

const contactController = require("../../controllers/contact/index");
const authMiddleware = require("../../middlewares/auth");

router.get("/", contactController.getIndex);
router.get("/add-new-hotel", contactController.getHotelInfo);
router.post("/add-new-hotel", contactController.postHotelInfo);
router.get("/add-new-airline", contactController.getAirlineInfo);
router.post("/add-new-airline", contactController.postAirlineInfo);
router.get(
  "/new-hotel-dashboard",
  contactController.getHotelDashboard,
  authMiddleware.isAuthenticated,
  authMiddleware.isStaff
);
router.get(
  "/new-airline-dashboard",
  contactController.getAirlineDashboard,
  authMiddleware.isAuthenticated,
  authMiddleware.isStaff
);
router.get(
  "/new-hotel-dashboard/detail/new-hotel",
  contactController.getHotelDetail,
  authMiddleware.isAuthenticated,
  authMiddleware.isStaff
);
router.get(
  "/new-airline-dashboard/detail/new-airline",
  contactController.getAirlineDetail,
  authMiddleware.isAuthenticated,
  authMiddleware.isStaff
);

router.post(
  "/new-airline-dashboard/detail/new-airline",
  contactController.getFlukeMaYet,
  authMiddleware.isAuthenticated,
  authMiddleware.isStaff
);
module.exports = router;
