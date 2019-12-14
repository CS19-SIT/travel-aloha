const express = require("express");
const router = express.Router();

const hotelBookingController = require("../../controllers/hotel/booking");
const authMiddleware = require("../../middlewares/auth");
// router.get("/hotel-booking",authMiddleware.isAuthenticated, hotelBookingController.getHotelBooking);

router.get("/", hotelBookingController.getIndex);

router.post("/reviewform", hotelBookingController.postIndex);

router.post("/confirmbooking", hotelBookingController.postConfirm);

router.get("/payment", hotelBookingController.getPayment);
module.exports = router;
