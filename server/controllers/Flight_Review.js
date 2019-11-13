const Hotel_Review = require("../models/Flight_Review");

exports.getIndex = async (req, res) => {
  try {
    let data = await Flight_Review.getAllFlight_Review();

    res.render("./Flight_Review", {
      pageTitle: "Travel Aloha - Flight Review",
      user: req.user,
      hotel: data
    });
  } catch (err) {
    res.sendStatus(404);
  }
};

exports.putFlight_Review = async (req, res) => {
  try {
    await Hotel.modelUpdateFlight_Review(req.body);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(404);
  }
};