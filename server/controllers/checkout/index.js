exports.getIndex = (req, res) => {
  
  res.render("payment/checkout", {
    pageTitle: "TravelAloha - Checkout",
    user: req.user,
    newSession: req.session.bookingID
  });
};
