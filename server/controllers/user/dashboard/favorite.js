exports.getIndex = (req, res) =>
  res.render("fav/favorite", {
    pageTitle: "TravelAloha - Dashboard - Favorite",
    user: req.user
  });
