exports.getIndex = (req, res) => {
  res.render("contact/index", {
    pageTitle: "TravelAloha - Contact",
    user: req.user
  });
};

exports.getDashboard = (req, res) => {
  res.render("contact/dashboard", {
    pageTitle: "TravelAloha - Contact - Dashboard",
    user: req.user
  });
};
