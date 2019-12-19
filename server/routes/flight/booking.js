const express = require("express");
const router = express.Router();

const flightBookingController = require("../../controllers/flight/booking");
const authMiddleware = require("../../middlewares/auth");

router.get("/test", flightBookingController.getTest);

router.post("/info", flightBookingController.postIndex);

router.post("/contact", authMiddleware.isAuthenticated, flightBookingController.getContact);
// router.post("/contact", flightBookingController.getContact);

router.post("/contact1",flightBookingController.postUpsell);

router.post("/payment",flightBookingController.postPayment);

router.post("/thankyou",flightBookingController.postThankyou);

router.post("/donut", flightBookingController.getDonut);

module.exports = router;
