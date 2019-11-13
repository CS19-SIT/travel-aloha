const express = require('express');
const router = express.Router();


router.get('/', function(req,res) {
    res.render('payment/checkout',{
        pageTitle: 'TravelAloha-Checkout',
        user: req.user
    });
});

module.exports = router;