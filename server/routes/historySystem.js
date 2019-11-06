const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const authMiddleware = require("../middlewares/auth");

router.get('/history',(req,res) => {
    res.render('history/history',{
        pageTitle: "hisrory", //ชื่อtitleของNAV
        user: req.user
    })
})


module.exports = router;