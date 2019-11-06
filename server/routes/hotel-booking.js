const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const hotelBookingController = require("../controllers/hotelBookingController/hotel-booking");

router.get("/hotel-booking",auth.isAuthenticated, hotelBookingController.getHotelBooking);

router.get("/hotel-booking-payment", hotelBookingController.getHotelBookingPayment);

module.exports = router;