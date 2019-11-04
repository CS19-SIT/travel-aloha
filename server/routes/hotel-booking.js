const express = require("express");
const router = express.Router();

const hotelBookingController = require("../controllers/hotel-booking");

router.get("/hotel-booking", hotelBookingController.getHotelBooking);

router.get("/hotel-booking-payment", hotelBookingController.getHotelBookingPayment);

module.exports = router;