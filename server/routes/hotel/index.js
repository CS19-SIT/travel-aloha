const express = require("express");
const router = express.Router();

const hotelController = require("../../controllers/hotel/index");
const hotelBookingController = require("../../controllers/hotel/booking");

router.post("/find", hotelController.getHotel);

router.get("/findFilter", hotelController.findFilters);

router.get("/", hotelController.getIndex);

router.get("/hotel/:id", hotelBookingController.getHotelInfo);

module.exports = router;
