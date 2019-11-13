const express = require("express");
const router = express.Router();

const historyController = require("../controllers/history");
const authMiddleware = require("../middlewares/auth");

router.get("/", authMiddleware.isAuthenticated, historyController.getIndex);

router.get("/", authMiddleware.isAuthenticated, historyController.getHotel);

router.get(
  "/hotel",
  authMiddleware.isAuthenticated,
  historyController.getHotel
);

router.get(
  "/flight",
  authMiddleware.isAuthenticated,
  historyController.getFlight
);

module.exports = router;
