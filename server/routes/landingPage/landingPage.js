const express = require("express");
const router = express.Router();

const landingPageController = require("../../controllers/landingPage/landingPage");
const authMiddleware = require("../../middlewares/auth");

router.get(
    "/",
    authMiddleware.isAuthenticated,
    landingPageController.getIndex
  );
  

module.exports = router;