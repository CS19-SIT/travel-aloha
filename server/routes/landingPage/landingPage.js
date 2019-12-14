const express = require("express");
const router = express.Router();

const landingPageController = require("../../controllers/landingPage/landingPage");

router.get("/", landingPageController.getIndex);

module.exports = router;
