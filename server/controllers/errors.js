exports.get404 = (req, res) => res.status(404).render("404", {
    pageTitle: "TravelAloha - Page Not Found",
    user: req.user
  });

exports.get500 = (req, res) =>
  res.status(500).render("errors/500", {
    pageTitle: "TravelAloha - Internal Server Error",
    user: req.user
  });