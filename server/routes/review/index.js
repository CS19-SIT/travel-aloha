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

router.delete(
    "/hotelreview/delete/:id",
    authMiddleware.isAuthenticated,
    reviewController.deleteHotelReview
  );

  router.delete(
    "/airlinereview/delete/:id",
    authMiddleware.isAuthenticated,
    reviewController.deleteAirlineReview
  );

  router.put(
    "/hotelreview/new",
    authMiddleware.isAuthenticated,
    reviewController.editHotelReview
  );

  router.put(
    "/airlinereview/new",
    authMiddleware.isAuthenticated,
    reviewController.editAirlineReview
  );


module.exports = router;
