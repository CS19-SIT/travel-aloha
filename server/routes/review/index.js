const express = require("express");
const router = express.Router();

const reviewController = require("../../controllers/review/index");
const authMiddleware = require("../../middlewares/auth");

router.get("/hotel", reviewController.getHotel);

router.get("/flight", reviewController.getFlight);

router.get("/airline",reviewController.getAirline);


// router.get("/hotel/:hotel_hotelId", reviewController.getHotel);

// router.get("/flight/:Flight_Flight_number", reviewController.getFlight);

router.post("/hotel", reviewController.postHotelReview);

router.post("/flight", reviewController.postFlightReview);


module.exports = router;
