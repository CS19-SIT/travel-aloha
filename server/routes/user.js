const express = require('express');
const router = express.Router();
const userController = require("../controllers/userDashboardController/user");


router.get("/", userController.getDashboard);
router.get("/editProfile", userController.getEditProfile);

module.exports = router;