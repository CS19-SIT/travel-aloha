const example = require("../../../models/example");
const userdashboard = require("../../../models/userdashboard");
const multer = require("../../../utils/multer-config");

exports.getDashboard = (req, res) => {
  // const userId = req.params.id;
  res.render("user/userDashboard", {
    pageTitle: "TravelAloha - Dashboard",
    user: req.user
  });
};

exports.getEditProfile = async (req, res) => {
  try {
    let data = await example.getAllCountry();
    res.render("user/editProfile", {
      user: req.user,
      pageTitle: "TravelAloha - Dashboard - Edit Profile",
      country: data
    });
  } catch (err) {
    res.sendStatus(400);
  }

};

exports.postEditProfile = async (req, res) => {
  const form = req.body;
  multer.upload(req, res, async err => {
    // const profilepicture = req.files["profile_picture"][0].filename;
    try {
      // console.log(req.body, req.user);
      await userdashboard.updateProfile({
        ...form,
        user_id: req.user.user_id,
        birth_date: new Date(form.birth_date)
      });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  });
};