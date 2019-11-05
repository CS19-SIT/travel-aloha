const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const authMiddleware = require("../middlewares/auth");

router.get("/register", authController.getRegister);

router.post("/register", authController.postRegister);

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.post("/logout", authMiddleware.isAuthenticated, authController.postLogout);

router.get('/test/:userId', (req, res) =>{
    const id = req.params.userId;
    if(id < 5){
        res.send(`HAHAYES ${id}`);
    }
    else{
        res.send(`NO ${id}`);
    }
});




const staffAdminController = require("../controllers/staffAdmin")



router.get('/staffAdminRec', staffAdminController.getApplicationForm);
router.get('/staffAdminReq', staffAdminController.getStaffCandidatesList);
router.get('/staffAdminMan', staffAdminController.getAllStaffDetail);

router.get('/hahayes', (req, res) => {
    res.send('Hello');
})

//////////EXPERIMENTAL//////////
router.get('/staffAdminRec/:userId', staffAdminController.getApplicationForm2);

// router.get('/staffAdminRec/:userId', async (request, response) => {
//     try {
//         result = await connector.query(`SELECT * FROM user WHERE username = 'hahayes'`)
//         response.render('staff_admin/recruiting', {
//             pageTitle: 'TravelAloha - StaffRecruiting',
//             user: request.user,
//             data: JSON.stringify(result[0])
//         })
//     } catch (error) {
//         response.send(`
//         <!DOCTYPE html><head><title></title></head>
//         <body><h1>Something was wrong</h1></body>
//         `)
//     }
// });

module.exports = router;
