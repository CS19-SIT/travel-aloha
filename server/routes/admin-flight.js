const express = require("express");
const router = express.Router();

const adminFlightController = require("../controllers/admin-flight");
const authMiddleware = require("../middlewares/auth");

router.get("/", authMiddleware.isAuthenticated, adminFlightController.getIndex);

module.exports = router;
