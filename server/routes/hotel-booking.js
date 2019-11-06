const express = require("express");
const router = express.Router();

const hotelBookingController = require("../controllers/hotelBookingController/hotel-booking");

router.get("/hotel-booking", hotelBookingController.getHotelBooking);
router.get("/hotel-booking-payment", hotelBookingController.getHotelBookingPayment);
router.post("/hotel-booking",hotelBookingController.postHotelBooking);

module.exports = router;