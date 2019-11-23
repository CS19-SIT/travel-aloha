const express = require("express");
const router = express.Router();

const landingController = require("../../controllers/hotel");

router.post("/find", landingController.find);

router.get('/findFilter',landingController.findFilters);

router.get("/hotel", landingController.index);

module.exports = router;
