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
    pageTitle: "TravelAloha - Contact - Register New Aotel",
    user: req.user
  });
});

router.get(
  "/dashboard",
  authMiddleware.isAuthenticated,
  authMiddleware.isStaff,
  contactController.getDashboard
);

router.get(
  "/dashboard/detail",
  authMiddleware.isAuthenticated,
  authMiddleware.isStaff,
  function(req, res, next) {
    res.render("contact/new-hotel-detail", {
      pageTitle: "TravelAloha - Contact - New Hotel Detail",
      user: req.user
    });
  }
);

module.exports = router;
