exports.getHotelBooking = (req, res) => 
   res.render("hotel_booking/hotel-booking", {
      pageTitle: "TravelAloha - Hotel Booking",
      user: req.user
   });

exports.getHotelBookingPayment = (req, res) =>
   res.render("hotel_booking/hotel-booking-payment", {
      pageTitle: "TravelAloha - Review and Payment",
      user: req.user
   })