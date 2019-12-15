const express = require("express");
const router = express.Router();


const flightController = require("../controllers/flight/index");

const searchFlightController = require("../controllers/flight/flight_info");

router.post("/findFlight", searchFlightController.getFlight);

// router.get('/findFilter',hotelController.findFilters);

const indexController = require("../controllers/index");

router.get("/", indexController.getIndex);


module.exports = router;
