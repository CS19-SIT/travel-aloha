const express = require("express");
const router = express.Router();

const flightController = require("../../controllers/flight/index");

const searchFlightController = require("../../controllers/flight/flight_info");

router.get("/", searchFlightController.getFlight);

module.exports = router;
