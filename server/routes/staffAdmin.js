const express = require('express')
const router = express.Router()

const staffAdminController = require('../controllers/staffAdmin')
const authMiddleware = require("../middlewares/auth")

router.get('/recruiting', authMiddleware.isAuthenticated, staffAdminController.getApplicationForm)
router.get('/requisition', authMiddleware.isAuthenticated, staffAdminController.getStaffCandidatesList)
router.get('/management', authMiddleware.isAuthenticated, staffAdminController.getDetailAllExistedStaff)
router.get('/',staffAdminController.getIndexPage);
router.post('/sendQuery', async function(request, response) {
    const connector = require("../db/db")
    try {
        console.log(request.body)
        await connector.query(request.body.sql)
        response.json({
            status: 200
        })
    } catch {
        response.json({
            status: 400
        })
    }
})
router.post('/getQuery', async function(request, response) {
    const connector = require("../db/db")
    try {
        console.log(request.body)
        let data = await connector.query(request.body.sql)
        response.json({
            result: data[0],
            status: 200
        })
    } catch {
        response.json({
            status: 400
        })
    }
})

module.exports = router