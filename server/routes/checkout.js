const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_c8Sj0KgrzEbhjUJFj7vDC84w00OVqNpUbO');


router.get('/', function(req,res) {
    res.render('payment/checkout',{
        pageTitle: 'TravelAloha-Checkout',
        user: req.user
    });
});
router.post("/charge", (req, res) => {
    try {
        stripe.customers
            .create({
                name: "req.body.username",
                // email: req.body.email,
                source: req.body.stripeToken
            })
            .then(customer =>
                stripe.charges.create({
                    // amount: req.body.amount * 100,
                    amount:  100,
                    currency: "usd",
                    customer: 1
                })
            )
            .then(() => res.render("index"))
            .catch(err => console.log(err));
    } catch (err) {
        console.log("ERROR",err)
        res.send(err);
    }
});
module.exports = router;