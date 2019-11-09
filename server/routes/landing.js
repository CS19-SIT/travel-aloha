const express = require("express");
const router = express.Router();

const landingController = require("../controllers/landing");

router.post("/find", landingController.find);

module.exports = router;
