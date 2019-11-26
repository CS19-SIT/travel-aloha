const connector = require('../db/db')

exports.isStaff = async function(id) {
	try {
		const result = await connector.query(`SELECT * FROM staff_admin_info WHERE staffId='${id}'`)
		return !!result[0].length
	} catch (error) {
		throw error
	}
}

exports.formStatus = async function(id) {
	try {
		const result = await connector.query(`SELECT status, message FROM staff_admin_pre WHERE staffId='${id}'`)
		return result[0]
	} catch (error) {
		throw error
	}
}

exports.formCancel = async function(id) {
	try {
		await connector.query(`DELETE FROM staff_admin_pre WHERE staffId='${id}'`)
	} catch (error) {
		throw error
	}
}

exports.getStaffStatus = async function(id) {
	try {
		const status = await connector.query(`SELECT status FROM staff_admin_info WHERE staffId='${id}'`)
		return status[0][0]['status']
	} catch (error) {
		throw error
	}
}

exports.getStaffCRUD = async function(id) {
	try {
		const crud = await connector.query(`SELECT can_create, can_read, can_update, can_delete FROM staff_admin_CRUD WHERE staffId='${id}'`)
		if (crud[0].length) {
			return crud[0][0]
		} else {
			return {
				can_create: 'F',
				can_read: 'F',
				can_update: 'F',
				can_delete: 'F',
			}
		}
	} catch (error) {
		throw error
	}
}
