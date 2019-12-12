const stripe = require('stripe')('sk_test_c8Sj0KgrzEbhjUJFj7vDC84w00OVqNpUbO');
const hotelBooking = require('../../models/checkoutModels/chekout');
const axios = require('axios');

exports.getIndex = async (req, res) => {
  try {
    let data = await hotelBooking.retrieveBookingDetail();
    let data2 = await hotelBooking.retrieveBookingHead();
    let data3 = await hotelBooking.retrieveNameHotel();
    let data4 = await hotelBooking.retrievePriceHotel();
    res.render("payment/checkout", {
      pageTitle: "TravelAloha - Checkout",
      user: req.user,
      booking_detail: data,
      booking_head: data2,
      hotel: data3,
      room_detail: data4
    });
  } catch (err) {
    res.sendStatus(404);
  }
};

exports.postIndex = async (req, res) => {
  try {
stripe.paymentIntents.create({
          amount: 10000,
          currency: "thb",
          payment_method_types: ["card"],
    })
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
          customer: customer.id,
          description: 'Customer for jenny.rosen@example.com'
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
