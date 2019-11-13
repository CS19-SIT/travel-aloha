const express = require("express");
const router = express.Router();

const checkoutController = require("../controllers/checkout");
const authMiddleware = require("../middlewares/auth");

router.get("/", authMiddleware.isAuthenticated, checkoutController.getIndex);

module.exports = router;
