var express = require("express");
var router = express.Router();

const contactController = require("../../controllers/contact/index");
const authMiddleware = require("../../middlewares/auth");

router.get("/", contactController.getIndex);

router.get("/add-new-airline", function(req, res, next) {
  res.render("contact/add-new-airline", {
    pageTitle: "TravelAloha - Contact - Register New Airline",
    user: req.user
  });
});

router.get("/add-new-hotel", function(req, res, next) {
  res.render("contact/add-new-hotel", {
    pageTitle: "TravelAloha - Contact - Register New Hotel",
    user: req.user
  });
});

router.get(
  "/new-hotel-dashboard",
  authMiddleware.isAuthenticated,
  authMiddleware.isStaff,
  contactController.getHotelDashboard
);

router.get(
  "/new-airline-dashboard",
  authMiddleware.isAuthenticated,
  authMiddleware.isStaff,
  contactController.getAirlineDashboard
);
router.post(
  "/new-hotel-dashboard/detail/new-hotel",
  authMiddleware.isAuthenticated,
  authMiddleware.isStaff,
  contactController.getHotelDetail
);
router.post(
  "/new-airline-dashboard/detail/new-airline",
  authMiddleware.isAuthenticated,
  authMiddleware.isStaff,
  contactController.getAirlineDetail
);
module.exports = router;
