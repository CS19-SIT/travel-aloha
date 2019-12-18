const express = require("express");
const router = express.Router();

const hotelController = require("../../controllers/hotel/index");

router.post("/find", hotelController.getHotel);

router.get("/findFilter", hotelController.findFilters);

router.get("/", hotelController.getIndex);

module.exports = router;
