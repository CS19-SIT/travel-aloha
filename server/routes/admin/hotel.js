const express = require("express");
const router = express.Router();

const adminHotelController = require("../../controllers/admin/hotel");
const authMiddleware = require("../../middlewares/auth");

router.get(
  "/",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminHotelController.getIndex
);

router.get(
  "/new",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminHotelController.getNew
);

router.get(
  "/edit/:hotelId",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminHotelController.getEdit
);


router.post(
  "/",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminHotelController.postIndex
);

router.put(
  "/:hotelId",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminHotelController.putIndex
);

router.delete(
  "/:hotelId",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminHotelController.deleteIndex
);

module.exports = router;
