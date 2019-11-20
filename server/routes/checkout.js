const express = require('express');
const router = express.Router();

const checkoutController = require("../../server/controllers/paymentController/checkout");
// const authMiddleware = require("../../middlewares/auth");

router.get("/",checkoutController.getIndex);

router.post("/charge", checkoutController.postIndex);

module.exports = router;