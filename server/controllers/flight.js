exports.getIndex = (req, res) =>
res.render("flights", {
  pageTitle: "TravelAloha - Flight",
  user: req.user
})