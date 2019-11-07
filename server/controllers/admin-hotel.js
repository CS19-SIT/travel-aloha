const Hotel = require("../models/admin-hotel");

exports.getIndex = async (req, res) => {
  try {
    let data = await Hotel.getAllHotel();

    res.render("admin/all-hotels", {
      pageTitle: "Travel Aloha - Admin - Manage All hotels",
      user: req.user,
      hotel: data
    });
  } catch (err) {
    res.sendStatus(404);
  }
};

exports.putHotel = async (req, res) => {
  try {
    await Hotel.modelUpdateHotel(req.body);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(404);
  }
};
