const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const authMiddleware = require("../middlewares/auth");
const staffAdminController = require("../controllers/staffAdmin")

router.get("/register", authController.getRegister);

router.post("/register", authController.postRegister);

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.post("/logout", authMiddleware.isAuthenticated, authController.postLogout);

router.get('/staffAdminRec', staffAdminController.getApplicationForm);
router.get('/staffAdminReq', staffAdminController.getStaffCandidatesList);
router.get('/staffAdminMan', staffAdminController.getAllStaffDetail);


router.get('/hahayes', (req, res) => {
    res.send('Hello');
})

router.get('/test/:userId', (req, res) =>{
    const id = req.params.userId;
    if(id < 5){
        res.send(`HAHAYES ${id}`);
    }
    else{
        res.send(`NO ${id}`);
    }
});

//////////EXPERIMENTAL//////////
router.get('/staffAdminRec/:userId', staffAdminController.getApplicationForm2);

module.exports = router;
