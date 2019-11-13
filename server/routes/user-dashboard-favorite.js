const express = require("express");
const router = express.Router();

const userFavoriteController = require("../controllers/user-dashboard-favorite");

router.get("/", userFavoriteController.getIndex);

module.exports = router;
