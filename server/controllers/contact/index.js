const contactModel = require("../../models/contact");
const multer = require("../../utils/multer-config");

exports.getIndex = (req, res) => {
  res.render("contact/index", {
    pageTitle: "TravelAloha - Contact",
    user: req.user
  });
};
exports.getHotelInfo = (req, res) => {
  try {
    res.render("contact/add-new-hotel", {
      pageTitle: "TravelAloha - Contact - Register New Hotel",
      user: req.user
    });
  } catch (err) {
    res.sendStatus(400);
  }
};
exports.getAirlineInfo = (req, res) => {
  res.render("contact/add-new-airline", {
    pageTitle: "TravelAloha - Contact - Register New Airline",
    user: req.user
  });
};
exports.postHotelInfo = async (req, res) => {
  try {
    multer.upload(req, res, async err => {
      const {
        hotelName,
        hotelEmail,
        hotelAddress,
        hotelTelNumber,
        hotelContactNumber,
        hotelDescription,
        hotelRoomType,
        hotelRoomPrice
      } = req.body;

      if (err) {
        res.sendStatus(400)
        return;
      }
      
      const hotelProfile = req.files["hotelProfile"][0].filename;
      const hotelPicture = req.files["hotelPicture"][0].filename;

      await contactModel.insertNewHotel({
        hotelName,
        hotelDescription,
        hotelAddress,
        hotelTelNumber,
        hotelContactNumber,
        hotelEmail,
        hotelRoomType,
        hotelRoomPrice,
        hotelProfile,
        hotelPicture
      });
    });
  } catch (error) {
    res.sendStatus(400);
    throw new Error(`[ERR] insertNewHotel: ${error}`);
  } finally {
    res.redirect("dashboard-new-hotel");
  }
};
exports.postAirlineInfo = async (req, res) => {
  const {
    airlineName,
    airlineEmail,
    airlineAddress,
    airlineNationality,
    airlineTelNumber,
    airlineContactNumber,
    airlineDescription,
    airlineSeatType,
    airlineSeatPrice,
    airlinePlaneDes
  } = req.body;

  try {
    await contactModel.insertNewAirline({
      airlineName,
      airlineNationality,
      airlineEmail,
      airlineDescription,
      airlineAddress,
      airlineTelNumber,
      airlineContactNumber,
      airlineSeatType,
      airlineSeatPrice,
      airlinePlaneDes
    });
    res.status(200);
  } catch (error) {
    res.sendStatus(400);
    throw new Error(`[ERR] insertNewAirline: ${error}`);
  } finally {
    res.redirect("dashboard-new-airline");
  }
};
exports.getHotelDashboard = async (req, res) => {
  try {
    let hotelData = await contactModel.getHotelDashboard();
    res.status(200);
    res.render("contact/new-hotel-dashboard", {
      pageTitle: "TravelAloha - Contact - New Hotel Dashboard",
      user: req.user,
      hotel: hotelData
    });
  } catch (err) {
    res.sendStatus(400);
  }
};
exports.getAirlineDashboard = async (req, res) => {
  try {
    let airlineData = await contactModel.getAirlineDashboard();
    res.status(200);
    res.render("contact/new-airline-dashboard", {
      pageTitle: "TravelAloha - Contact - New Airline Dashboard",
      user: req.user,
      airline: airlineData
    });
  } catch (err) {
    res.sendStatus(400);
  }
};
exports.getHotelDetail = async (req, res) => {
  try {
    let data = contactModel.getHotelDetailInfo();
    res.status(200);
    res.render("contact/new-hotel-detail", {
      pageTitle: "TravelAloha - Contact - New Hotel Detail",
      user: req.user,
      hotelDetail: data
    })
  } catch (error) {
    res.sendStatus(400);
  }
};
exports.getAirlineDetail = async (req, res) => {
  let data = contactModel.getAirlineDetailInfo();
  try {
    res.status(200);
    res.render("contact/new-airline-detail", {
      pageTitle: "TravelAloha - Contact - New Airline Detail",
      user: req.user,
      airlineDetail: data
    });
  } catch (error) {
    res.sendStatus(400);
    throw new Error(`[ERR] getAirlineDetail: ${error}`);
  }
};
