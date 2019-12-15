const express = require("express");
const router = express.Router();


const flightController = require("../../controllers/flight/index");

router.post("/findFlight", flightController.findAll);

// router.get('/findFilter',hotelController.findFilters);

router.get("/flights", flightController.getIndex);

const indexController = require("../controllers/index");

router.get("/", indexController.getIndex);


module.exports = router;
