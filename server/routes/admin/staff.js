const express = require('express');
const router = express.Router();

const conn = require('../../db/db');
const passport = require('../../auth/passport');
const adminStaffCtrl = require('../../controllers/admin/staff');


router.get('/login', (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect('/admin/staff/register');
	}
	return adminStaffCtrl.showLoginForm(req, res);
});
router.post('/login', passport.authenticate("local", {
	successRedirect: "/admin/staff/register",
	failureRedirect: "/admin/staff/login"
}));
router.post('/logout', (req, res) => {
	req.session.destroy((err) => {
		return res.redirect("/admin/staff/login");
	});
});


router.get('/', adminStaffCtrl.showIndex);

router.get('/register', (req, res) => {
	if (req.isAuthenticated()) {
		return adminStaffCtrl.showRegistrationForm(req, res);
	}
	return res.redirect('/admin/staff/login');
});

router.get('/home', (req, res) => {
	if (req.isAuthenticated()) {
		return adminStaffCtrl.showHomepage(req, res);
	}
	return res.redirect('/admin/staff/login');
});
router.get('/profile', (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect('/admin/staff/profile/'+req.user.user_id);
	}
	return res.redirect('/admin/staff/login');
});
router.get('/profile/:id', (req, res) => {
	if (req.isAuthenticated()) {
		return adminStaffCtrl.showProfile(req, res);
	}
	return res.redirect('/admin/staff/login');
});
router.get('/project', (req, res) => {
	if (req.isAuthenticated()) {
		return adminStaffCtrl.showProject(req, res);
	}
	return res.redirect('/admin/staff/login');
});
router.get('/requisition', (req, res) => {
	if (req.isAuthenticated()) {
		return adminStaffCtrl.showRequisition(req, res);
	}
	return res.redirect('/admin/staff/login');
});

router.post('/deleteStaff', async (req, res) => {
	try {
		const isManager = await conn.query(`SELECT 1 FROM staff_manager WHERE staffId='${req.body.deletedid}'`);
		if (isManager[0].length) {
			throw 'Can\'t delete manager';
		}
		await conn.query(`DELETE FROM staff_project_request_join WHERE staffId='${req.body.deletedid}'`);
		await conn.query(`DELETE FROM staff_project_timeline WHERE staffId='${req.body.deletedid}'`);
		await conn.query(`DELETE FROM staff_project_participant WHERE staffId='${req.body.deletedid}'`);
		await conn.query(`DELETE FROM staff_project WHERE ownerId='${req.body.deletedid}'`);
		await conn.query(`DELETE FROM staff_info WHERE staffId='${req.body.deletedid}'`);
		res.json({
			status: 200
		});
	} catch (err) {
		res.json({message: err, status: 400});
	}
});
router.post('/beManager', async (req, res) => {
	try {
		const dept = await conn.query(`SELECT deptNo FROM staff_info WHERE staffId='${req.body.newid}'`);
		const mgr = await conn.query(`SELECT staffId FROM staff_manager WHERE deptNo='${dept[0][0].deptNo}'`);
		if (mgr[0].length) {
			const projIds = conn.query(`SELECT projectId FROM staff_project WHERE ownerId='${mgr[0][0].staffId}' AND finishDate IS NULL`);
			const projIdGroup = projIds[0].map((item) => `'${item.projectId}'`).join(',');
			await conn.query(`DELETE FROM staff_project_request_join WHERE projectId IN (${projIdGroup}) AND staffId='${req.body.newid}'`);
			await conn.query(`DELETE FROM staff_project_participant WHERE projectId IN (${projIdGroup}) AND staffId=${req.body.newid}`);
		}
		await conn.query(`UPDATE staff_project SET ownerId='${req.body.newid}' WHERE ownerId='${mgr[0][0].staffId}'`);
		await conn.query(`INSERT INTO staff_manager VALUES('${dept[0][0].deptNo}','${req.body.newid}') ON DUPLICATE KEY UPDATE staffId=VALUES(staffId)`);
		res.json({
			status: 200
		});
	} catch (err) {
		res.json({message: err, status: 400});
	}
});


router.post('/getQuery', async (req, res) => {
	try {
		const data = await conn.query(req.body.sql);
		res.json({data: data[0], status: 200});
	} catch (err) {
		res.json({message: err, status: 400});
	}
});
router.post('/sendQuery', async (req, res) => {
	try {
		await conn.query(req.body.sql);
		res.json({status: 200});
	} catch (err) {
		res.json({message: err, status: 400});
	}
});


module.exports = router;
