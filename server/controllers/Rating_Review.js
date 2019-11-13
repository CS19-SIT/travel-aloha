const Hotel_Review = require("../models/HotelReview");

exports.getIndex = async (req, res) => {
  try {
    let data = await Hotel_Review.getAllHotel_Review();

    res.render("./Hotel_Review", {
      pageTitle: "Travel Aloha - Hotel Review",
      user: req.user,
      hotel: data
    });
  } catch (err) {
    res.sendStatus(404);
  }
};

exports.putHotel_Review = async (req, res) => {
  try {
    await Hotel.modelUpdateHotel_Review(req.body);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(404);
  }
};