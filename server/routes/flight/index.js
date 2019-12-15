const express = require("express");
const router = express.Router();

const flightController = require("../../controllers/flight/index");

const searchFlightController = require("../controllers/flight/flight_info");

router.post("/findFlight", searchFlightController.getFlight);

router.get("/", flightController.getIndex);

module.exports = router;
