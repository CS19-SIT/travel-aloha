const express = require("express");
const router = express.Router();

const flightController = require("../controllers/flight");

router.get("/", flightController.getIndex);

module.exports = router;
