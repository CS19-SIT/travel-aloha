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
