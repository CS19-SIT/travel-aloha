const express = require("express");
const router = express.Router();

const flightController = require("../../controllers/flight/index");
const authMiddleware = require("../../middlewares/auth");

router.get("/", flightController.getIndex);

module.exports = router;
