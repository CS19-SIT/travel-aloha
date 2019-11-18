exports.getHotel = (req, res) =>
  res.render("review_rating/hotel", {
    pageTitle: "TravelAloha - Review - Hotel",
    user: req.user
  });

exports.getFlight = (req, res) =>
  res.render("review_rating/airline", {
    pageTitle: "TravelAloha - Review - Airline",
    user: req.user
  });