const express = require("express");
const router = express.Router();

const flightBookingController = require("../controllers/flight-booking");

router.get("/", flightBookingController.getIndex);

router.get("/contact", flightBookingController.getContact);

module.exports = router;
