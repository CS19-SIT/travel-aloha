const Hotel = require("../../../models/history");
exports.getIndex = async (req, res) => {
  let info = await Hotel.getHotelName(req.user.user_id);
  console.log(info);

    res.render("history/index",{
    pageTitle: "TravelAloha - Dashboard - History",
    user: req.user,
    hotelName : info["hotelname"],
    timeStamp : info['timestamp'],
    airlineName : info['airlineName'],
    flight_number :info['flight_number'],
  });
};

exports.getHotel = (req, res) => {
  res.render("history/hotel", {
    pageTitle: "TravelAloha - Dashboard - History - Hotel",
    user: req.user
  });
};

exports.getFlight = (req, res) => {
  res.render("history/flight", {
    pageTitle: "TravelAloha - Dashboard - History - Flight",
    user: req.user
  });
};

exports.getHotelData = async (req, res) => {
  try {
    //let data = await Hotel.getHotelName(req.user.user_id);

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
