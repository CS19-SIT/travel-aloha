exports.getIndex = (req, res) =>
  res.render("flight_booking/flight_info", {
    pageTitle: "TravelAloha - Flight - Booking",
    user: req.user
  });

exports.getTest = (req, res) =>
  res.render("flight_booking/testflight", {
    pageTitle: "TravelAloha - Flight - TEST",
    user: req.user
  });

exports.getContact = (req, res) =>
  res.render("flight_booking/contact_form", {
    pageTitle: "Contact information",
    user: req.user
  });