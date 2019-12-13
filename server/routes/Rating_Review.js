const express = require("express");
const router = express.Router();

const ratingReviewController = require("../controllers/Rating_Review");
const authMiddleware = require("../middlewares/auth");

router.get("/hotelreview", ratingReviewController.getRegister);

// router.post("/hotelreview", authController.postRegister);

router.get("/flightreview", authController.getLogin);

// router.post("/flightreview", authController.postLogin);

router.post("/logout", authMiddleware.isAuthenticated, authController.postLogout);

module.exports = router;