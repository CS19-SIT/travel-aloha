const express = require("express");
const router = express.Router();

const checkoutController = require("../../controllers/checkout/index");
const authMiddleware = require("../../middlewares/auth");

router.get("/", checkoutController.getIndex);
module.exports = router;
