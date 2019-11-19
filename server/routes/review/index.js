const express = require("express");
const router = express.Router();

const reviewController = require("../../controllers/review/index");
const authMiddleware = require("../../middlewares/auth");

router.get("/hotel", reviewController.getHotel);

router.get("/flight", reviewController.getFlight);

module.exports = router;
