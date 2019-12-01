const express = require("express");
const router = express.Router();

const flightBookingController = require("../../controllers/flight/booking");
const authMiddleware = require("../../middlewares/auth");

router.get("/info", flightBookingController.getIndex);

router.post("/info", flightBookingController.getIndex);

router.get("/test", flightBookingController.getTest);
// router.post("/test", flightBookingController.postTest);

router.get("/contact", flightBookingController.getContact);

// router.get("/donut", flightBookingController.getDonut);
router.post("/donut", flightBookingController.getDonut);

module.exports = router;
