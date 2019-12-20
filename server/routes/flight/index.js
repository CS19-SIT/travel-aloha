const express = require("express");
const router = express.Router();

const searchFlightController = require("../../controllers/flight/flight_info");

router.post("/find", searchFlightController.getSearchFlight);

router.get("/", searchFlightController.getFlight);

module.exports = router;
