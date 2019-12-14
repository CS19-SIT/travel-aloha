const express = require("express");
const router = express.Router();

<<<<<<< HEAD
const flightController = require("../../controllers/flight/index");

router.post("/findFlight", flightController.findAll);

// router.get('/findFilter',hotelController.findFilters);

router.get("/flights", flightController.getIndex);
=======
const indexController = require("../controllers/index");

router.get("/", indexController.getIndex);
>>>>>>> 0c980ab50c21cd9f02469b1f7aad9bd0ab98b603

module.exports = router;
