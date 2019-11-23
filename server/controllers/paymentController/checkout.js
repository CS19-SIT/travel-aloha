const stripe = require('stripe')('sk_test_c8Sj0KgrzEbhjUJFj7vDC84w00OVqNpUbO');

//hotel
const hotelBooking = require('../../models/checkoutModels/chekout'); 


exports.getIndex = async (req, res) => {
    try{
        let data = await hotelBooking.retrieveBookingDetail();
        let data2 = await hotelBooking.retrieveBookingHead();
        res.render("payment/checkout", {
        pageTitle: "TravelAloha - Checkout",
        user: req.user,
        booking_detail: data,
        booking_head: data2
    });
} catch (err) {
    res.sendStatus(404);
}
};

exports.postIndex = async (req, res) => {
    try {
        stripe.customers
            .create({
                name: req.body.username,
                email: req.body.email,
                source: req.body.stripeToken
            })
            .then(customer =>
                stripe.charges.create({
                    amount: req.body.amount * 100,
                    amount: 10000,
                    currency: "thb",
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