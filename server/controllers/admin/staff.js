const connector = require('../../db/db')
const adminStaffModel = require('../../models/admin-staff')

exports.getIndex = function(request, response) {
	response.render('staff_admin/index', {
		pageTitle: 'TravelAloha - Admin - StaffLandingPage',
		user: request.user,
	})
}

exports.getApplicationForm = async function(request, response) {
	try {
		const staffStatus = await adminStaffModel.getStaffStatus(request.user.user_id)
		if (staffStatus == 'active') {
			response.redirect('/admin/staff/management')
		}
		const matchedInfo = await connector.query(`SELECT user_id, birth_date, profile_picture, username, CONCAT(firstname, ' ', lastname) AS name, gender, address FROM user WHERE user_id='${request.user.user_id}'`)
		response.render('staff_admin/recruiting', {
			pageTitle: 'TravelAloha - Admin - StaffRecruiting',
			user: request.user,
			onPending: (staffStatus == 'pending')?'true':'false',
			isDisband: (staffStatus == 'inactive')?'true':'false',
			data: JSON.stringify(matchedInfo[0][0])
		})
	} catch (error) {
		response.send(`
			<!DOCTYPE html><head><title>Oops</title></head>
			<body><p>Something was wrong !! ${error} </p></body>
		`)
	}
}

exports.getStaffCandidatesList = async function(request, response) {
	try {
		const staffStatus = await adminStaffModel.getStaffStatus(request.user.user_id)
		const userAuth = await adminStaffModel.getStaffCRUD(request.user.user_id)
		if (staffStatus != 'active' || userAuth['can_create'] == 'F') {
			response.redirect('/admin/staff/recruiting')
		}
		const candidatesList = await connector.query(`SELECT user_id, profile_picture, CONCAT(firstname, ' ', lastname) AS Name, sdi.department, sdi.role FROM user, staff_admin_info sdi WHERE user_id=staffID AND sdi.status='pending'`)
		response.render('staff_admin/requisition', {
            pageTitle: 'TravelAloha - Admin - StaffRequisition',
            user: request.user,
			data: JSON.stringify(candidatesList[0])
		})
	} catch (error) {
		response.send(`
			<!DOCTYPE html><head><title>Oops</title></head>
			<body><p>Something was wrong !! ${error} </p></body>
		`)
	}
}

exports.getDetailAllExistedStaff = async function(request, response) {
	try {
		const staffStatus = await adminStaffModel.getStaffStatus(request.user.user_id)
		if (staffStatus != 'active') {
			response.redirect('/admin/staff/recruiting')
		}
		const userAuth = await adminStaffModel.getStaffCRUD(request.user.user_id)
		const staffList = await connector.query(`SELECT user_id, profile_picture, CONCAT(firstname, ' ', lastname) AS name, birth_date, gender, address, sdi.department, sdi.role FROM user, staff_admin_info sdi WHERE user_id=staffID AND sdi.status='active' AND user_id<>'${request.user.user_id}'`)
		response.render('staff_admin/management', {
			pageTitle: 'TravelAloha - StaffManagement',
			user: request.user,
			canCreate: (userAuth['can_create']=='T')?'true':'false',
			canRead: (userAuth['can_read']=='T')?'true':'false',
			canUpdate: (userAuth['can_update']=='T')?'true':'false',
			canDelete: (userAuth['can_delete']=='T')?'true':'false',
			data: JSON.stringify(staffList[0])
		})
	} catch (error) {
		response.send(`
			<!DOCTYPE html><head><title>Oops</title></head>
			<body><p>Something was wrong !! ${error} </p></body>
		`)
	}
}
