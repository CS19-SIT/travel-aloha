const adminStaffModel = require('../../models/admin-staff');
const conn = require('../../db/db');

exports.showIndex = async (req, res) => {
	try {
		const deptList = await conn.query(`SELECT * FROM staff_department ORDER BY deptName`);
		const rolesFirstDept = await conn.query(`SELECT * FROM staff_role WHERE deptNo='${deptList[0][0].deptNo}'`);
		res.render('staff_admin/index', {
			pageTitle: 'TravelAloha - Admin - StaffLandingPage',
			user: req.user,
			deptList: deptList[0],
			rolesFirstDept: rolesFirstDept[0]
		});
	} catch (err) {
		res.status(400).send(err);
	}
};

exports.showLoginForm = (req, res) => {
	res.render('staff_admin/login', {
		pageTitle: 'TravelAloha - Admin - StaffLogin',
		user: req.user
	});
};

exports.showRegistrationForm = async (req, res) => {
	try {
		const isStaff = await conn.query(`SELECT * FROM staff_info WHERE staffId='${req.user.user_id}' AND latestCheckIn IS NOT NULL`);
		if (!!isStaff[0].length) {
			return res.redirect('/admin/staff/home');
		}
		const isSubmitting = await conn.query(`SELECT status, responseMessage FROM staff_registration WHERE userId='${req.user.user_id}'`);
		const userInfo = await conn.query(`SELECT CONCAT(firstname, ' ', lastname) AS name, birth_date, address, profile_picture  FROM user WHERE user_id='${req.user.user_id}'`);
		res.render('staff_admin/registration', {
			pageTitle: 'TravelAloha - Admin - StaffRegistration',
			user: req.user,
			isSubmitting: !!isSubmitting[0].length,
			responseForm: (isSubmitting[0].length)?isSubmitting[0][0]:null,
			userInfo: userInfo[0][0]
		});
	} catch (err) {
		res.status(400).send(err);
	}
};

exports.showHomepage = async (req, res) => {
	try {
		const isStaff = await conn.query(`SELECT * FROM staff_info WHERE staffId='${req.user.user_id}'`);
		if (!isStaff[0].length) {
			return res.redirect('/admin/staff/register');
		}
		res.render('staff_admin/homepage', {
			pageTitle: 'TravelAloha - Admin - StaffHomepage',
			user: req.user
		});
	} catch (err) {
		res.status(400).send(err);
	}
};
