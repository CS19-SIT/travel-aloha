const connector = require('../../db/db')
const adminStaffModel = require('../../models/admin-staff')

exports.showIndex = function(request, response) {
	response.render('staff_admin/index', {
		pageTitle: 'TravelAloha - Admin - StaffLandingPage',
		user: request.user,
	})
}

exports.showApplication = async function(request, response) {
	const existedInfo = await connector.query(`SELECT username, profile_picture, CONCAT(firstname, ' ', lastname) AS name, IF(gender='M','Male', 'Female') as gender, birth_date, address FROM user WHERE user_id='${request.user.user_id}'`)
	response.render('staff_admin/application', {
		pageTitle: 'TravelAloha - Admin - StaffApplication',
		user: request.user,
		info: JSON.stringify(existedInfo[0])
	})
}
