const express = require('express')
const router = express.Router()

const staffAdminController = require('../../controllers/admin/staff')
const authMiddleware = require('../../middlewares/auth')
const connector = require('../../db/db')


router.get(
	'/',
	staffAdminController.showIndex
)
router.get(
	'/application',
	authMiddleware.isAuthenticated,
	staffAdminController.showApplication
)

router.post(
	'/sendQuery', 
	async function(request, response) {
		try {
			await connector.query(request.body.sql)
			response.json({
				status: 200
			})
		} catch (error) {
			response.json({
				result: error,
				status: 400
			})
		}
	}
)
router.post(
	'/getQuery',
	async function(request, response) {
		try {
			let data = await connector.query(request.body.sql)
			response.json({
				result: data[0],
				status: 200
			})
		} catch (error) {
			response.json({
				result: error,
				status: 400
			})
		}
	}
)

module.exports = router
