const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const authMiddleware = require("../middlewares/auth");

router.get("/register", authController.getRegister);

router.post("/register", authController.postRegister);

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.post("/logout", authMiddleware.isAuthenticated, authController.postLogout);

router.get('/staffApp', function(req, res) {
    res.render('staff_admin/staff-recruiting', {
        pageTitle: 'TravelAloha - StaffRecruiting',
        user: req.user
    })
} )

module.exports = router;
