const express = require("express");
const router = express.Router();

const adminFlightController = require("../../controllers/admin/flight");
const authMiddleware = require("../../middlewares/auth");

router.get(
  "/",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminFlightController.getIndex
);

router.get(
  "/new",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminFlightController.getNew
);

router.get(
  "/edit/:flightId",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminFlightController.getEdit
);


router.post(
  "/",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminFlightController.postIndex
);

router.put(
  "/:flightId",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminFlightController.putIndex
);

router.delete(
  "/:flightId",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminFlightController.deleteIndex
);

module.exports = router;
