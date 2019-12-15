const express = require("express");
const router = express.Router();

const flightController = require("../../controllers/flight/index");
const authMiddleware = require("../../middlewares/auth");
const flightSearchController = require("../../controllers/flight/flight_info");

router.post("/findFlight", flightSearchController.getFlight);

router.get("/", flightController.getIndex);

module.exports = router;
