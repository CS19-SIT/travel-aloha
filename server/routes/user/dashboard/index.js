const express = require("express");
const router = express.Router();

const userController = require("../../../controllers/user/dashboard");
const authMiddleware = require("../../../middlewares/auth");

router.get("/", authMiddleware.isAuthenticated, userController.getDashboard);

router.get(
  "/editProfile",
  authMiddleware.isAuthenticated,
  userController.getEditProfile
);

module.exports = router;