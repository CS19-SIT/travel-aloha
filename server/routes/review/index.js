const express = require("express");
const router = express.Router();

const reviewController = require("../../controllers/review/index");
const authMiddleware = require("../../middlewares/auth");

router.get("/hotel/:id", reviewController.getHotel);

// router.get("/flight", reviewController.getFlight);

router.get("/airline/:id",reviewController.getAirline);

// router.get("/hotel/:hotel_hotelId", reviewController.getHotel);

// router.get("/flight/:Flight_Flight_number", reviewController.getFlight);

router.post("/hotel/:id", reviewController.postHotelReview, authMiddleware.isAuthenticated);

router.post("/airline/:id", reviewController.postAirlineReview, authMiddleware.isAuthenticated);

router.get("/hotel/:id/:review_id/delete", authMiddleware.isAuthenticated, reviewController.deleteHotelReview);

  router.get(
    "/airline/:id/:review_id/delete",
    authMiddleware.isAuthenticated,
    reviewController.deleteHotelReview
  );

  router.put(
    "/hotelreview/new/:id",
    authMiddleware.isAuthenticated,
    reviewController.editHotelReview
  );

  router.put(
    "/airlinereview/new/:id",
    authMiddleware.isAuthenticated,
    reviewController.editAirlineReview
  );


module.exports = router;
