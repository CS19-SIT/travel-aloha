const express = require('express')
const router = express.Router()

const staffAdminController = require('../controllers/staffAdmin')

router.get('/staffAdminRec', staffAdminController.getApplicationForm)
router.get('/staffAdminReq', staffAdminController.getStaffCandidatesList)
router.get('/staffAdminMan', staffAdminController.getAllStaffDetail)

router.get('/hahayes', (req, res) => {
    res.send('Hello');
});

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

module.exports = router