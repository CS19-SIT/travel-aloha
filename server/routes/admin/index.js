const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/admin/index");
const authMiddleware = require("../../middlewares/auth");

router.get(
  "/",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminController.getIndex
);

module.exports = router;
