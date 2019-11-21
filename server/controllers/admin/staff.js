const connector = require('../../db/db')
const adminStaffModel = require('../../models/admin-staff')

exports.getIndex = function(request, response) {
	response.render('staff_admin/index', {
		pageTitle: 'TravelAloha - Admin - StaffLandingPage',
		user: request.user,
	})
}

exports.showApplicationForm = async function(request, response) {
	try {
		const isStaff = await adminStaffModel.isStaff(request.user.user_id)
		const formStatus = await adminStaffModel.formStatus(request.user.user_id)
		if (isStaff || (formStatus.length && formStatus[0]['status'] == 'approved')) {
			response.redirect('/admin/staff/management')
			return
		}
		if (formStatus.length && formStatus[0]['status'] == 'rejected') {
			await adminStaffModel.formCancel(request.user.user_id)
		}
		const matchedInfo = await connector.query(`SELECT username, profile_picture, CONCAT(firstname, ' ', lastname) AS name, gender, birth_date, address FROM user WHERE user_id='${request.user.user_id}'`)
		response.render('staff_admin/recruiting', {
			pageTitle: 'TravelAloha - Admin - StaffRecruiting',
			user: request.user,
			onPending: (formStatus.length && formStatus[0]['status'] == 'pending')?'true':'false',
			isDisband: (formStatus.length && formStatus[0]['status'] == 'rejected')?'true':'false',
			message: (formStatus.length)?formStatus[0]['message']:'',
			data: JSON.stringify(matchedInfo[0][0])
		})
	} catch (error) {
		response.send(`
			<!DOCTYPE html><head><title>Oops</title></head>
			<body><p>Something was wrong !! ${error} </p></body>
		`)
	}
}

exports.showStaffCandidatesList = async function(request, response) {
	try {
		const staffAuth = await adminStaffModel.getStaffCRUD(request.user.user_id)
		if (staffAuth['can_create'] == 'F') {
			response.redirect('/admin/staff/recruiting')
			return
		}
		const formStatus = await adminStaffModel.formStatus(request.user.user_id)
		if (formStatus.length) {
			response.redirect('/admin/staff/management')
			return
		}
		const candidatesList = await connector.query(`SELECT user_id, profile_picture, CONCAT(firstname, ' ', lastname) AS Name, sdi.department, sdi.role, sdi.message FROM user, staff_admin_pre sdi WHERE user_id=staffId AND sdi.status='pending'`)
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

exports.showDetailAllExistedStaff = async function(request, response) {
	try {
		const isStaff = await adminStaffModel.isStaff(request.user.user_id)
		const formStatus = await adminStaffModel.formStatus(request.user.user_id)
		if (!isStaff) {
			response.redirect('/admin/staff/recruiting')
			return
		}
		if (formStatus.length) {
			await adminStaffModel.formCancel(request.user.user_id)
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
			message: (formStatus.length)?formStatus[0]['message']:'',
			data: JSON.stringify(staffList[0])
		})
	} catch (error) {
		response.send(`
			<!DOCTYPE html><head><title>Oops</title></head>
			<body><p>Something was wrong !! ${error} </p></body>
		`)
	}
}


exports.showHomepage = async function(request, response) {
	try {
		const department = await connector.query(`SELECT * FROM staff_department`)
		response.render('staff_admin/homepage', {
			pageTitle: 'TravelAloha - Company',
			departmentList: JSON.stringify(department[0])
		})
	} catch (error) {
		response.status(500)
	}
}