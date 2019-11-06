const express = require('express')
const router = express.Router()

const staffAdminController = require('../controllers/staffAdmin')
const authMiddleware = require("../middlewares/auth")

router.get('/recruiting', authMiddleware.isAuthenticated, staffAdminController.getApplicationForm)
router.get('/requisition', authMiddleware.isAuthenticated, staffAdminController.getStaffCandidatesList)
router.get('/management', authMiddleware.isAuthenticated, staffAdminController.getDetailAllExistedStaff)

module.exports = router