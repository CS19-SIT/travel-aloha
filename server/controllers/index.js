exports.getIndex = (req, res) =>
  res.render("index", {
    pageTitle: "TravelAloha",
    user: req.user
  });
