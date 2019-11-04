const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const authMiddleware = require("../middlewares/auth");

const flight = require("");

router.get("/register", authController.getRegister);

router.post("/register", authController.postRegister);

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.post("/logout", authMiddleware.isAuthenticated, authController.postLogout);

module.exports = router;
