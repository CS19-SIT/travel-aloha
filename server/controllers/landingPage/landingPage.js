const page = require("../../models/landingPage");
const hotel = require("../../models/admin-hotel");

exports.getIndex = async (req, res) => {
  try {
    let data = await page.countUsers();
    let dataHotel = await page.countHotel();
    let dataPlace = await page.countPlace();
    let hotelInfo = await hotel.getAllHotel();
    let flightInfo = await page.getAllFlight();
    let countAirline = await page.countAirline();
    let discountInfo = await page.getDiscountRoom();
    let airlineInfo = await page.getAllAirline();
    let countAirlineNum = await page.getMostFlightBooking();

    res.render("landingPage/userLanding", {
      pageTitle: "TravelAloha",
      user: req.user,
      data: data,
      dataHotel: dataHotel,
      dataPlace: dataPlace,
      hotelInfo: hotelInfo,
      flightInfo: flightInfo,
      countAirline:countAirline,
      discountInfo:discountInfo,
      airlineInfo:airlineInfo,
      countAirlineNum:countAirlineNum
    });
  } catch (err) {
    res.sendStatus(404);
  }
};
