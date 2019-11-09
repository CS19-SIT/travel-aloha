const express = require("express");
const router = express.Router();

const landingController = require("../controllers/landing");

router.get("/find", landingController.find);

module.exports = router;
