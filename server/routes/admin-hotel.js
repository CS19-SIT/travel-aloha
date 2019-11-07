const express = require("express");
const router = express.Router();

const adminHotelController = require("../controllers/admin-hotel");
const authMiddleware = require("../middlewares/auth");

router.get(
  "/",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminHotelController.getIndex
);

router.put(
  "/edit",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminHotelController.putHotel
);

module.exports = router;
