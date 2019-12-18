const express = require("express");
const router = express.Router();

const userFavoriteController = require("../../../controllers/user/dashboard/favorite");
const authMiddleware = require("../../../middlewares/auth");

router.get(
  "/",
  authMiddleware.isAuthenticated,
  userFavoriteController.getIndex
);

router.post(
  "/saved",
  authMiddleware.isAuthenticated,
  userFavoriteController.savedFavorite
)
router.post(
  "/delete",
  authMiddleware.isAuthenticated,
  userFavoriteController.deleteFavorite
)

router.post(
  "/savedFlight",
  authMiddleware.isAuthenticated,
  userFavoriteController.savedFlight
)
router.post(
  "/deleteFlight",
  authMiddleware.isAuthenticated,
  userFavoriteController.deleteFlight
)

module.exports = router;
