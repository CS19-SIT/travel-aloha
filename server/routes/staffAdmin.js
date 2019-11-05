const express = require('express')
const router = express.Router()

const staffAdminController = require('../controllers/staffAdmin')

router.get('/recruiting', staffAdminController.getApplicationForm)
router.get('/requisition', staffAdminController.getStaffCandidatesList)
router.get('/manager', staffAdminController.getDetailAllExistedStaff)


module.exports = router