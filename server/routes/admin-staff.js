const express = require("express");
const router = express.Router();

const staffAdminController = require("../controllers/admin-staff");
const authMiddleware = require("../middlewares/auth");

router.get("/", staffAdminController.getIndex);

router.get(
  "/recruiting",
  authMiddleware.isAuthenticated,
  staffAdminController.getApplicationForm
);

router.get(
  "/requisition",
  authMiddleware.isAuthenticated,
  staffAdminController.getStaffCandidatesList
);

router.get(
  "/management",
  authMiddleware.isAuthenticated,
  staffAdminController.getDetailAllExistedStaff
);


module.exports = router;
