exports.getHotelBooking = (req, res) => 
   res.render("hotel_booking/hotel-booking", {
      pageTitle: "TravelAloha - Hotel Booking",
      user: req.user,
   });

exports.getHotelBookingPayment = (req, res) =>
   res.render("hotel_booking/hotel-booking-payment", {
      pageTitle: "TravelAloha - Review and Payment",
      user: req.user
   })


   exports.postHotelBooking = (req,res) =>{
      const result = JSON.stringify({
         inputFirstName: req.body.inputFirstName
         ,inputLastName: req.body.inputLastName
         ,inputEmail: req.body.inputEmail
         ,inputPhoneNo: req.body.inputPhoneNo});
         
      console.log(JSON.parse(result));
      res.send(result);
     }
//Probably needed in controller dont mind these comment
// no idea...
// no idea...
// no idea...
// received form from booking form
// if no register, popup some register promote