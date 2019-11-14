var express = require('express');
var router = express.Router();

const contactController = require("../controllers/contact");
const authMiddleware = require("../middlewares/auth");

router.get("/", contactController.getIndex);
router.get("/dashboard", authMiddleware.isAuthenticated, authMiddleware.isStaff, contactController.getDashboard);
router.get("/add-new-airline", contactController.getAirlineInfo);
router.get("/add-new-hotel", contactController.getHotelInfo);
router.get("/dashboard/detail", authMiddleware.isAuthenticated, authMiddleware.isStaff, contactController.getHotelDetail);

module.exports = router;