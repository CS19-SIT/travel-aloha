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
  multer.upload(req, res, async err => {
    const {

    } = req.body
    const profilepicture = req.files["profile_picture"][0].filename;
    try {
      // console.log(req.body, req.user);
      await userdashboard.updateProfile({
        ...req.body,
        user_id: req.user.user_id
      });
      res.sendStatus(204);
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  });
};