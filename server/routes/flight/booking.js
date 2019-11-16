const express = require("express");
const router = express.Router();

const flightBookingController = require("../../controllers/flight/booking");
const authMiddleware = require("../../middlewares/auth");

router.get("/", flightBookingController.getIndex);

router.get("/test", flightBookingController.getTest);

router.get("/v2", flightBookingController.getV2);

router.get("/contact", flightBookingController.getContact);



module.exports = router;