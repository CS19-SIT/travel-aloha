const stripe = require("stripe")("sk_test_c8Sj0KgrzEbhjUJFj7vDC84w00OVqNpUbO");
const hotelBooking = require("../../models/checkoutModels/chekout");
const db = require("../../db/db");

exports.getIndex = async (req, res) => {
    try {
        //just example that retrieveHotelData/ 
        let data = await hotelBooking.retrieveBookingDetail();
        let data2 = await hotelBooking.retrieveBookingHead();
        let data3 = await hotelBooking.retrieveNameHotel();
        let data4 = await hotelBooking.retrievePriceHotel();
        let data5 = await hotelBooking.retrieveCouponCode();

        res.render("payment/checkout_flight", {
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


        stripe.customers
            .create({
                name: req.user.username,
                email: "sakdipat3536@gmail.com",
                address: req.body.address,
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

                .then(async (result2) => {
                    var ts = new Date(result2.status_transitions.finalized_at).toISOString().slice(0, 19).replace('T', ' ');
                    var statusDate = new Date(result2.period_start).toISOString().slice(0, 19).replace('T', ' ');
                    var statusDate2 = new Date(result2.period_end).toISOString().slice(0, 19).replace('T', ' ');

                        await db.query("INSERT INTO TransactionType VALUES(?,?) ",
                            [
                                result2.charge,
                                "flight"
                            ]),

                        await db.query("INSERT INTO PaymentType VALUES(?, ?)",
                            [
                                result2.payment_intent,
                                "card"
                            ]),

                        await db.query("INSERT INTO FlightTransaction VALUES(? , ? , ? , ? , ? , ? ,? ,? ,? ,? ,? )",
                            [
                                result2.customer_name,
                                result2.customer,
                                result2.charge,
                                result2.number,
                                null,
                                result2.tax,
                                result2.total,
                                result2.currency,
                                null,
                                ts,
                                result2.payment_intent,
                            ]),

                        await db.query("INSERT INTO TransactionStatus_Code VALUES(?, ?)",
                            [
                                result2.webhooks_delivered_at,
                                result2.status
                            ]),

                        await db.query("INSERT INTO FlightTransaction_StatusAccept VALUES(?, ? , ?" ,
                        [
                            result2.webhooks_delivered_at,
                            result2.customer,
                            statusDate
                        ]),

                        await db.query("INSERT INTO FlightTransaction_StatusReject VALUES(?, ? , ?, ?)" ,
                        [
                           result.webhooks_delivered_at,
                            result2.customer,
                            "ggg",
                            statusDate2
                        ]),


                        await db.query("INSERT INTO Invoice VALUES(?, ? , ?)" ,
                        [
                            result2.id,
                            result2.charge,
                            result2.customer_email
                        ])

                    console.log(result);
                    res.render("payment/completedPayment_flight", {
                        pageTitle: "TravelAloha-completed-flight",
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