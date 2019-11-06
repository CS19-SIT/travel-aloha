const hotelbook  = require("../../models/hotelBookingModel/bookingHotel");
exports.getHotelBooking = (req, res) => 
   res.render("hotel_booking/hotel-booking", {
      pageTitle: "TravelAloha - Hotel Booking",
      user: req.user,
      Hoteldetail: req.detail
      // if(req.user == null) ??{}
      // pop up (Do you want to register ? to get promotion )
      // 
   });

exports.getHotelBookingPayment = (req, res) => // request ไปกรอกข้อมูล // 
   res.render("hotel_booking/hotel-booking-payment", {
      pageTitle: "TravelAloha - Review and Payment",
      user: req.user
      // 
   })