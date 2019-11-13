var express = require('express');
var router = express.Router();

const Contact_SystemController = require("../controllers/Contact_System");

router.get("/", Contact_SystemController.getContactSystem);
router.get("/informationFlow", Contact_SystemController.getInformation);
router.get("/newAirlineInfo", Contact_SystemController.getAirlineInfo);
router.get("/newHotelInfo", Contact_SystemController.getHotelInfo);
router.get("/hotelDetail", Contact_SystemController.getHotelDetail);

module.exports = router;