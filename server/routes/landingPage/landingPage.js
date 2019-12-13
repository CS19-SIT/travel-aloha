const express = require("express");
const router = express.Router();

const userDashboardController = require("../../controllers/landingPage/landingPage");
const authMiddleware = require("../../middlewares/auth");

router.get(
    "/",
    authMiddleware.isAuthenticated,
    userDashboardController.getIndex
  );
  

module.exports = router;