exports.getDashboard = (req, res) => {
  // const userId = req.params.id;
  res.render("user/userDashboard", {
    pageTitle: "TravelAloha - Dashboard",
    user: req.user
  });
};

exports.getEditProfile = (req, res) => {
  res.render("user/editProfile", {
    user: req.user,
    pageTitle: "TravelAloha - Dashboard - Edit Profile"
  });
};
