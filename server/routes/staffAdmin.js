const express = require('express')
const router = express.Router()

const staffAdminController = require('../controllers/staffAdmin')

router.get('/recruiting', staffAdminController.getApplicationForm)
router.get('/requisition', staffAdminController.getStaffCandidatesList)
router.get('/manager', staffAdminController.getAllExistedStaffDetail)

//////////EXPERIMENTAL//////////
router.get('/recruiting/:userId', staffAdminController.getApplicationForm2);

module.exports = router