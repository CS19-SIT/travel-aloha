const contactModel = require("../../models/contact");
const multer = require("../../utils/multer-config");

exports.getIndex = (req, res) => {
  res.render("contact/index", {
    pageTitle: "TravelAloha - Contact",
    user: req.user
  });
};
exports.getHotelInfo = (req, res) => {
  try{
    res.render("contact/add-new-hotel", {
      pageTitle: "TravelAloha - Contact - Register New Hotel",
      user: req.user
    });
  }catch (err) {
    res.sendStatus(404);
  }
};
exports.getAirlineInfo = (req, res) => {
  res.render("contact/add-new-airline", {
    pageTitle: "TravelAloha - Contact - Register New Airline",
    user: req.user
  });
};
exports.postHotelInfo = async (req, res) => {
  const {
    hotelName,
    hotelEmail,
    hotelAddress,
    hotelTelNumber,
    hotelContactNumber,
    hotelDescription,
    hotelRoomType,
    hotelRoomPrice,
    hotelPromotion,
    hotelProfile,
    hotelPicture
  } = req.body;
  try {
    await contactModel.insertNewHotel({
      hotelName,
      hotelDescription,
      hotelAddress,
      hotelTelNumber,
      hotelContactNumber,
      hotelEmail,
      hotelRoomType,
      hotelRoomPrice,
      hotelPromotion
    });
    // ** Wait for learning upload file
    // await contactModel.insertNewHotelFile({
    //   hotelPicture
    // })
    res.redirect("dashboard");
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
    throw new Error(`[ERR] insertNewHotel: ${error}`);
  }
};
exports.getDashboard = async(req, res) => {
  try{
    let hotelData = await contactModel.getHotelDashboard();
    let airlineData = await contactModel.getAirlineDashboard();
    res.render("contact/dashboard", {
      pageTitle: "TravelAloha - Contact - Dashboard",
      user: req.user,
      hotel: hotelData,
      airline: airlineData
    });
    res.sendStatus(204);
  }catch (err) {
    res.sendStatus(404);
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
    res.redirect("dashboard");
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
    throw new Error(`[ERR] insertNewHotel: ${error}`);
  }
};
exports.getHotelDetail = async(req, res) => {
  try{
    let data = contactModel.getHotelDetailInfo();
    res.render("contact/new-hotel-detail", {
      pageTitle: "TravelAloha - Contact - New Hotel Detail",
      user: req.user,
      hotelDetail: data
    });
    res.sendStatus(204);
  }catch(error){
    res.sendStatus(404);
    throw new Error(`[ERR] getHotelDetail: ${error}`);
  }
};
exports.getAirlineDetail = async(req, res) => {
  let data = contactModel.getAirlineDetailInfo();
  try{
    res.render("contact/new-airline-detail", {
      pageTitle: "TravelAloha - Contact - New Airline Detail",
      user: req.user,
      airlineDetail: data
    });
    res.sendStatus(204);
  }catch(error){
    res.sendStatus(404);
    throw new Error(`[ERR] getAirlineDetail: ${error}`);
  }
};
