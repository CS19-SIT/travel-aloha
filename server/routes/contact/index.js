var express = require("express");
var router = express.Router();

const contactController = require("../../controllers/contact/index");
const authMiddleware = require("../../middlewares/auth");

router.get("/", contactController.getIndex);
router.get("/add-new-hotel", contactController.getHotelInfo);
router.post("/add-new-hotel", contactController.postHotelInfo);
router.get("/add-new-airline", contactController.getAirlineInfo);
router.post("/add-new-airline", contactController.postAirlineInfo);
router.get(
  "/dashboard",
  contactController.getDashboard,
  authMiddleware.isAuthenticated,
  authMiddleware.isStaff
);
router.get(
  "/dashboard/detail",
  contactController.getHotelDetail,
  authMiddleware.isAuthenticated,
  authMiddleware.isStaff
);

module.exports = router;
