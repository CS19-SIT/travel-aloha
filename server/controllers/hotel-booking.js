const hotelbook = require("../models/hotel-booking");

exports.getIndex = (req, res) =>
  res.render("hotel_booking/hotel-booking", {
    pageTitle: "TravelAloha - Hotel Booking",
    user: req.user
    //Hoteldetail: req.detail
    // if(req.user == null) ??{}
    // pop up (Do you want to register ? to get promotion )
    //
  });

exports.getPayment = (req, res) => {
  // request ไปกรอกข้อมูล //
  res.render("hotel_booking/hotel-booking-payment", {
    pageTitle: "TravelAloha - Review and Payment",
    user: req.user,
    hotelData: {}
  });
};

exports.postIndex = (req, res) => {
  // const result = JSON.stringify({
  // 	inputFirstName: req.body.inputFirstName,
  // 	inputLastName: req.body.inputLastName,
  // 	inputEmail: req.body.inputEmail,
  // 	inputPhoneNo: req.body.inputPhoneNo
  // });

  // console.log(JSON.parse(result));
  // res.send(result);

  const result = {
    inputFirstName: req.body.inputFirstName,
    inputLastName: req.body.inputLastName,
    inputEmail: req.body.inputEmail,
    inputPhoneNo: req.body.inputPhoneNo
  };

  res.render("hotel_booking/hotel-booking-payment", {
    pageTitle: "TravelAloha - Hotel - Payment",
    user: req.user,
    hotelData: result
  });
  // res.redirect('/hotel-booking/payment')
};

//Probably needed in controller dont mind these comment
// no idea...
// no idea...
// no idea...
// received form from booking form
// if no register, popup some register promote
