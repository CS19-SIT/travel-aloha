const Rating_Review = require("../models/Rating_Review");

exports.getHotel = (req, res) =>
  res.render("review_rating/hotel", {
    pageTitle: "TravelAloha - Review - Hotel",
    user: req.user
  });

exports.getFlight = (req, res) =>
  res.render("review_rating/airline", {
    pageTitle: "TravelAloha - Review - Airline",
    user: req.user
  });

exports.postHotelReview = async (req, res) => {
  const {
    hotelName,
    hotelEmail,
    hotelAddress,
    hotelTelNumber,
    hotelContactNumber,
    hotelDescription,
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
      hotelEmail
    });
    // ** Wait for learning upload file
    // await contactModel.insertNewHotelFile({
    //   hotelPicture
    // })
    res.redirect("review_rating/hotel");
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
    throw new Error(`[ERR] insertNewHotel: ${error}`);
  }
};
exports.getHotelDetail = (req, res) => {
  res.render("contact/new-hotel-detail", {
    pageTitle: "TravelAloha - Contact - New Hotel Detail",
    user: req.user
  });
}


exports.getAirlineInfo = (req, res) => {
  res.render("contact/add-new-airline", {
    pageTitle: "TravelAloha - Contact - Register New Airline",
    user: req.user
  });
};
exports.postAirlineInfo = async (req, res) => {
  const {
    airlineName,
    airlineEmail,
    airlineAddress,
    airlineNationality,
    airlineTelNumber,
    airlineContactNumber,
    airlineDescription
  } = req.body;

  try {
    await contactModel.insertNewAirline({
      airlineName,
      airlineNationality,
      airlineEmail,
      airlineDescription,
      airlineAddress,
      airlineTelNumber,
      airlineContactNumber
    });
    res.redirect("dashboard");
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
    throw new Error(`[ERR] insertNewHotel: ${error}`);
  }
};

exports.getAirlineDetail = (req, res) => {
  res.render("contact/new-airline-detail", {
    pageTitle: "TravelAloha - Contact - New Airline Detail",
    user: req.user
  });
};