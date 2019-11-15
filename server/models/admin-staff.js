const connector = require('../db/db')

exports.getStaffStatus = async function(id) {
	try {
		const status = await connector.query(`SELECT status FROM staff_admin_info WHERE staffId='${id}'`)
		if (status[0].length) {
			return status[0][0]['status']
		}
		return 'user'
	} catch (error) {
		throw error
	}
}

exports.getStaffCRUD = async function(id) {
	try {
		const crud = await connector.query(`SELECT can_create, can_read, can_update, can_delete FROM staff_admin_CRUD WHERE staffId='${id}'`)
		return crud[0][0]
	} catch (error) {
		throw error
	}
}