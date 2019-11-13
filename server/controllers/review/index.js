exports.getHotel = (req, res) =>
  res.render("review&rating/reviewHotel", {
    pageTitle: "TravelAloha - Review - Hotel",
    user: req.user
  });

exports.getFlight = (req, res) =>
  res.render("review&rating/reviewAirline", {
    pageTitle: "TravelAloha - Review - Airline",
    user: req.user
  });
