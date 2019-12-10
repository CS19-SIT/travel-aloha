const adminStaffModel = require('../../models/admin-staff');
const conn = require('../../db/db');

exports.showIndex = async (req, res) => {
	try {
		const deptList = await conn.query(`SELECT * FROM staff_department`);
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
		const isStaff = await conn.query(`SELECT * FROM staff_info WHERE staffId='${req.user.user_id}'`);
		if (!!isStaff[0].length) {
			return res.redirect('/admin/staff/home');
		}
		res.render('staff_admin/registration', {
			pageTitle: 'TravelAloha - Admin - StaffRegistration',
			user: req.user
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
