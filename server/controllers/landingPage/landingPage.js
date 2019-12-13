exports.getIndex = (req, res) => {
    res.render("landingPage/userLanding", {
      pageTitle: "TravelAloha - Dashboard - History",
      user: req.user
    });
  };