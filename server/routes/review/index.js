const express = require("express");
const router = express.Router();

const reviewController = require("../../controllers/review/index");
const authMiddleware = require("../../middlewares/auth");

router.get("/hotel/:id", reviewController.getHotel);

// router.get("/flight", reviewController.getFlight);

router.get("/airline/:id",reviewController.getAirline);

// router.get("/hotel/:hotel_hotelId", reviewController.getHotel);

// router.get("/flight/:Flight_Flight_number", reviewController.getFlight);

router.post("/hotel/:id", reviewController.postHotelReview);

router.post("/airline/:id", reviewController.postAirlineReview);

module.exports = router;
