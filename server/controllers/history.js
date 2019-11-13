const Hotel = require("../models/historySys");

exports.getIndex = async (req, res) => {
  try {
      console.log(req.user.user_id);
    let data = await Hotel.getHotelName(req.user.user_id);

    // res.render("admin/all-hotels", {
    //   pageTitle: "Travel Aloha - Admin - Manage All hotels",
    //   user: req.user,
    //   hotel: data
    // });
    
    res.send(data);
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