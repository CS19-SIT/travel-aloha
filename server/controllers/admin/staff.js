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
		const isStaff = await conn.query(`SELECT 1 FROM staff_info WHERE staffId='${req.user.user_id}' AND status='active'`);
		if (!!isStaff[0].length) {
			return res.redirect('/admin/staff/home');
		}
		const isSubmitting = await conn.query(`SELECT status, responseMessage FROM staff_registration WHERE userId='${req.user.user_id}'`);
		const userInfo = await conn.query(`SELECT CONCAT(firstname, ' ', lastname) AS name, birth_date, address, profile_picture  FROM user WHERE user_id='${req.user.user_id}'`);
		res.render('staff_admin/registration', {
			pageTitle: 'TravelAloha - Admin - StaffRegistration',
			user: req.user,
			isStaff: false,
			isHR: false,
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
		const myInfo = await conn.query(`SELECT * FROM staff_info WHERE staffId='${req.user.user_id}' AND status='active'`);
		if (!myInfo[0].length) {
			return res.redirect('/admin/staff/register');
		}
		await conn.query(`UPDATE staff_info SET latestCheckIn=NOW() WHERE staffId='${req.user.user_id}'`);
		const deptList = await conn.query(`SELECT deptNo, deptName FROM staff_department ORDER BY deptName`);
		const staffs = await conn.query(`
								SELECT user_id, IF(profile_picture IS NULL, '', profile_picture) AS profile_picture, CONCAT(firstname, ' ', lastname) AS name, sr.deptNo, deptName, sr.roleId, roleName, salary, latestCheckIn,
										CASE WHEN EXISTS(SELECT 1 FROM staff_manager sm WHERE sm.staffId=si.staffId)
											THEN 'true'
											ELSE 'false'
						   				END AS isManager  
								FROM user u, staff_info si, staff_department sd, staff_role sr 
								WHERE	si.status='active'
									AND si.staffId=u.user_id
									AND si.deptNo=sd.deptNo 
									AND sd.deptNo=sr.deptNo
									AND si.roleId=sr.roleId
								ORDER BY isManager DESC, latestCheckIn`); 
		res.render('staff_admin/homepage', {
			pageTitle: 'TravelAloha - Admin - StaffHomepage',
			user: req.user,
			isStaff: true,
			isHR: (myInfo[0][0].deptNo == 'AA'),
			staffs: staffs[0],
			deptList: deptList[0]
		});
	} catch (err) {
		res.status(400).send(err);
	}
};

exports.showProfile = async (req, res) => {
	try {
		const myInfo = await conn.query(`SELECT * FROM staff_info WHERE staffId='${req.user.user_id}' AND status='active'`);
		if (!myInfo[0].length) {
			return res.redirect('/admin/staff/register');
		}
		const staffInfo = await conn.query(`SELECT CONCAT(firstname, ' ', lastname) AS name, birth_date, address, profile_picture, deptName, roleName, bio, salary,
												CASE WHEN EXISTS(SELECT 1 FROM staff_manager sm WHERE sm.staffId='${req.params.id}')
													THEN 'true'
													ELSE 'false'
												END AS isManager
											FROM user, staff_info si, staff_department sd, staff_role sr
											WHERE 	user_id='${req.params.id}'
												AND user_id=staffId
												AND si.deptNo=sd.deptNo
												AND sd.deptNo=sr.deptNo
												AND si.roleId=sr.roleId`);
		res.render('staff_admin/profile', {
			pageTitle: 'TravelAloha - Admin - StaffProfile',
			user: req.user,
			isStaff: true,
			isHR: (myInfo[0][0].deptNo == 'AA'),
			staffInfo: staffInfo[0][0],
			isMyself: (req.user.user_id == req.params.id)
		});
	} catch (err) {
		res.status(400).send(err);
	}
};

exports.showProject = async (req, res) => {
	try {
		const myInfo = await conn.query(`SELECT * FROM staff_info WHERE staffId='${req.user.user_id}' AND status='active'`);
		if (!myInfo[0].length) {
			return res.redirect('/admin/staff/register');
		}
		res.render('staff_admin/project', {
			pageTitle: 'TravelAloha - Admin - StaffProject',
			user: req.user,
			isStaff: true,
			isHR: (myInfo[0][0].deptNo == 'AA')
		});
	} catch (err) {
		res.status(400).send(err);
	}
};

exports.showRequisition = async (req, res) => {
	try {
		const myInfo = await conn.query(`SELECT * FROM staff_info WHERE staffId='${req.user.user_id}' AND status='active'`);
		if (!myInfo[0].length || myInfo[0][0].deptNo!='AA') {
			return res.redirect('/admin/staff/home');
		}
		const candidates = await conn.query(`SELECT user_id, profile_picture, CONCAT(firstname, ' ', lastname) AS name, birth_date, dep.deptName, rol.roleName, resume, address, IF(gender='M', 'Male', 'Female') AS gender, reg.deptNo, reg.roleId
											FROM user u, staff_registration reg, staff_department dep, staff_role rol
											WHERE 	u.user_id=reg.userId
												AND	reg.deptNo=dep.deptNo
												AND	dep.deptNo=rol.deptNo
												AND	reg.roleId=rol.roleId
												AND	reg.status='pending'
											ORDER BY deptName`);
		res.render('staff_admin/requisition', {
			pageTitle: 'TravelAloha - Admin - StaffRequisition',
			user: req.user,
			isStaff: true,
			isHR: true,
			candidates: candidates[0]
		});
	} catch (err) {
		res.status(400).send(err);
	}
};
