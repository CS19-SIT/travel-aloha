exports.getIndex = (req, res) =>
  res.render("adminDash/adminDash", {
    pageTitle: "TravelAloha - Admin Dashboard",
    user: req.user
  });
