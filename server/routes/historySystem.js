const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const authMiddleware = require("../middlewares/auth");
router.get('./history/HotelDetail',(req,res)=>{
    res.render('history/Hotel',{
        pageTitle: "HotelDetail",
        user: req.user
    })
})

router.get('/history',(req,res) => {
    res.render('history/history',{
        pageTitle: "hisrory", //ชื่อtitleของNAV
        user: req.user
    })
})
router.get('./hisrory/flightDetail',(req,res)=>{
    res.render('history/flight',{
        pageTitle: "FlightDetail",
        user: req.user
    })
})

module.exports = router;

