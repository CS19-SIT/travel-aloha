const express = require("express");
const router = express.Router();

const checkoutController = require("../../controllers/checkout/index");
const checkoutFlightController = require("../../controllers/checkout/checkout_flight");
const authMiddleware = require("../../middlewares/auth");

router.get("/", checkoutController.getIndex);
<<<<<<< HEAD
=======
router.get("/",checkoutFlightController.getIndex);
router.post("/charge", checkoutController.postIndex);

>>>>>>> checkoutSystem
module.exports = router;
