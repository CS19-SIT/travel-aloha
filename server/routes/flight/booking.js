const express = require("express");
const router = express.Router();

const flightBookingController = require("../../controllers/flight/booking");
const authMiddleware = require("../../middlewares/auth");

router.post("/info", flightBookingController.postIndex);

router.get("/test", flightBookingController.getTest);

router.post("/contact", flightBookingController.getContact);

router.post("/contact1",flightBookingController.postUpsell);

router.post("/donut", flightBookingController.getDonut);

module.exports = router;
