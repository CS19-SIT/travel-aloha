exports.getHotelBooking = (req, res) => 
   res.render("hotel_booking/hotel-booking", {
      pageTitle: "TravelAloha - Hotel Booking",
      user: req.user
   });