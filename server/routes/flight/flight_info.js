const express = require("express");
const router = express.Router();

const flightBookingController = require("../../controllers/flight/booking");
const flightController = require("../../controllers/flight/flight_info");
const authMiddleware = require("../../middlewares/auth");

router.post("/findFlight", flightController.getFlight);

router.get("/", flightBookingController.getIndex);

router.get("/test", flightBookingController.getTest);

router.get("/contact", flightBookingController.getContact);



module.exports = router;