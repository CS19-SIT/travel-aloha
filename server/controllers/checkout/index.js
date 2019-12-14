const stripe = require("stripe")("sk_test_c8Sj0KgrzEbhjUJFj7vDC84w00OVqNpUbO");
const hotelBooking = require("../../models/checkoutModels/chekout");


exports.getIndex = async (req, res) => {
  try {
    let data = await hotelBooking.retrieveBookingDetail();
    let data2 = await hotelBooking.retrieveBookingHead();
    let data3 = await hotelBooking.retrieveNameHotel();
    let data4 = await hotelBooking.retrievePriceHotel();
    let data5 = await hotelBooking.retrieveCouponCode();
    res.render("payment/checkout", {
      pageTitle: "TravelAloha - Checkout",
      user: req.user,
      booking_detail: data,
      booking_head: data2,
      hotel: data3,
      room_detail: data4,
      coupon: data5,


    });
  } catch (err) {
    res.sendStatus(404);
  }
};

exports.postIndex = async (req, res) => {
      try {
        let data = await hotelBooking.retrieveBookingDetail();
        let data2 = await hotelBooking.retrieveBookingHead();
        let data3 = await hotelBooking.retrieveNameHotel();
        let data4 = await hotelBooking.retrievePriceHotel();
        let data5 = await hotelBooking.retrieveCouponCode();

        stripe.customers.create({
            name: req.user.username,
            email: req.body.email,
            address:req.user.address,
            source: req.body.stripeToken
          })
          .then(customer =>
            stripe.charges.create({
              amount: req.body.amount * 100,
              amount: 300000,
              currency: "thb",
              customer: customer.id,

            })
            .then(() =>
              stripe.invoiceItems.create({
                customer: customer.id,
                amount: req.body.amount,
                currency: 'thb',
                description: 'One-time setup fee',
                unit_amount: 300000,
                quantity: 2 
              }, ))
              .then(() =>
              stripe.invoices.create({
                customer: customer.id,
                description: "My First Invoice Item(createdfor API docs)",
              })
              )
              .then(invoice => 
              stripe.invoices.pay(
                  invoice.id,
              ))
            .then(() =>
              res.render("payment/completedPayment", {
                pageTitle: "TravelAloha-completed",
                user: req.user,
                booking_detail: data,
                booking_head: data2,
                hotel: data3,
                room_detail: data4,
                coupon: data5
              })
            )
            .catch(err => console.log(err)));
          }
        catch (err) {
          console.log("ERROR", err);
          res.send(err);
        }
      };