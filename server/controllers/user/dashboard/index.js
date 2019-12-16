const example = require("../../../models/example");
exports.getDashboard = (req, res) => {
  // const userId = req.params.id;
  res.render("user/userDashboard", {
    pageTitle: "TravelAloha - Dashboard",
    user: req.user
  });
};

exports.getEditProfile = async(req, res) => {
  try{
    let data = await example.getAllCountry();
    res.render("user/editProfile", {
      user: req.user,
      pageTitle: "TravelAloha - Dashboard - Edit Profile",
      country: data
    });
  }catch(err){
    res.sendStatus(400);
  }
 
};
