const contactModel = require("../../models/contact");
exports.getIndex = (req, res) => {
  res.render("contact/index", {
    pageTitle: "TravelAloha - Contact",
    user: req.user
  });
};
exports.getDashboard = async(req, res) => {
  try{
    let hotelData = await contactModel.getHotelInfo();
    let airlineData = await contactModel.getAirlineInfo();
    res.render("contact/dashboard", {
      pageTitle: "TravelAloha - Contact - Dashboard",
      user: req.user,
      hotel: hotelData,
      airline: airlineData
    });
  }catch (err) {
    res.sendStatus(404);
  }
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
exports.postHotelInfo = async (req, res) => {
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
    res.redirect("dashboard");
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
