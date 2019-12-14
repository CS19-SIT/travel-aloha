const stripe = require("stripe")("sk_test_c8Sj0KgrzEbhjUJFj7vDC84w00OVqNpUbO");
const hotelBooking = require("../../models/checkoutModels/chekout");
const db = require("../../db/db");


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
    let code = null;
    let earnPoint = null;


    stripe.customers
      .create({
        name: req.user.username,
        email: "sakdipat3536@gmail.com",
        address: req.user.address,
        source: req.body.stripeToken
      })
      .then(customer =>

        stripe.invoiceItems.create({
          customer: customer.id,
          amount: req.body.amount,
          currency: "thb",
          description: "One-time setup fee",
          unit_amount: 300000,
          quantity: 2
        })

        .then(() =>
          stripe.invoices.create({
            customer: customer.id,
            description: "My First Invoice Item(createdfor API docs)"
          })
        )
        .then(invoice => stripe.invoices.pay(invoice.id))

        .then(async (result) => {

          await db.query(`INSERT INTO TransactionType 
                          VALUES('${result.charge}', '${"hotel"}')`);

          await db.query(`INSERT INTO PaymentType 
                          VALUES('${result.payment_intent}', '${"card"}')`);

          console.log(result.status_transitions.finalized_at);
          await db.query(`INSERT INTO HotelTransaction 
                          VALUES('${result.customer}', '${result.payment_intent}',
                          '${result.charge}','${result.number}',${code},${result.tax},${result.total}
                          ,'${result.currency}',${earnPoint},${result.status_transitions.finalized_at})`);

          await db.query(`INSERT INTO TransactionStatus_Code 
                          VALUES('${result.paid}', ${result.status})`);

          await db.query(`INSERT INTO HotelTransaction_StatusAccept 
                          VALUES('${result.paid}', '${result.customer}' , ${result.period_start},)`);

          await db.query(`INSERT INTO HotelTransaction_StatusReject 
                          VALUES('${result.paid}', '${result.customer}' , ${result.period_end},'${"ggg"}')`);

          await db.query(`INSERT INTO Invoice 
                          VALUES('${result.id}', '${result.charge}' , '${result.customer_email}')`);

          console.log(result);
          res.render("payment/completedPayment", {
            pageTitle: "TravelAloha-completed",
            user: req.user,
            booking_detail: data,
            booking_head: data2,
            hotel: data3,
            room_detail: data4,
            coupon: data5
          })
        })

        .catch(err => console.log(err)));
  } catch (err) {
    console.log("ERROR", err);
    res.send(err);
  }
};