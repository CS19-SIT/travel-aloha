const page = require("../../models/landingPage");
const hotel = require("../../models/admin-hotel");

exports.getIndex = async (req, res) => {
  try {
    let data = await page.countUsers();
    let dataHotel = await page.countHotel();
    let dataPlace = await page.countPlace();
    let hotelInfo = await hotel.getAllHotel();
    let flightInfo = await page.getAllFlight();

    res.render("landingPage/userLanding", {
      pageTitle: "TravelAloha",
      user: req.user,
      data: data,
      dataHotel: dataHotel,
      dataPlace: dataPlace,
      hotelInfo: hotelInfo,
      flightInfo: flightInfo
    });
  } catch (err) {
    res.sendStatus(404);
  }
};
