exports.getIndex = (req, res) => {
  console.log(req.bookindID);
  res.render("payment/checkout", {
    pageTitle: "TravelAloha - Checkout",
    user: req.user,
    newSession: req.bookindID
  });
  
};
