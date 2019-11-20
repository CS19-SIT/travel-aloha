const stripe = require('stripe')('sk_test_c8Sj0KgrzEbhjUJFj7vDC84w00OVqNpUbO');

exports.getIndex = (req, res) => {
    res.render("payment/checkout", {
        pageTitle: "TravelAloha - Checkout",
        user: req.user
    });
};
exports.postIndex = (req, res) => {
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
                    amount: 100,
                    currency: "usd",
                    customer: customer.id
                })
            )
            .then(() => res.render("payment/completedPayment", {
                pageTitle: 'TravelAloha-completed',
                user: req.user
            }))
            .catch(err => console.log(err));
    } catch (err) {
        console.log("ERROR", err)
        res.send(err);
    };
};