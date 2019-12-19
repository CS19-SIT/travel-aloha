const express = require("express");
const router = express.Router();
const multer = require('multer');

const userController = require("../../../controllers/user/dashboard");
const authMiddleware = require("../../../middlewares/auth");

const upload = multer().none();

router.get("/", authMiddleware.isAuthenticated, userController.getDashboard);

router.get(
  "/editProfile",
  authMiddleware.isAuthenticated,
  userController.getEditProfile
);

router.post(
  "/editProfile",
  authMiddleware.isAuthenticated,
  upload,
  userController.postEditProfile
);
module.exports = router;