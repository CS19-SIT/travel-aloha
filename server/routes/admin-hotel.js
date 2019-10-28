const express = require("express");
const router = express.Router();

const adminHotelController = require("../controllers/admin-hotel");
const authMiddleware = require("../middlewares/auth");

router.get("/register", authMiddleware.isAuthenticated, adminHotelController.getIndex);

module.exports = router;
