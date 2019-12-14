const express = require("express");
const router = express.Router();

const hotelController = require("../../controllers/hotel/index");

router.get("/", hotelController.getIndex);

router.post("/find", hotelController.getHotel);

module.exports = router;