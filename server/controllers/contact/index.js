const contactModel = require("../../models/contact");
const multer = require("../../utils/multer-config");
const db = require("../../db/db");

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
        hotelRoomType2,
        hotelRoomType3,
        hotelRoomType4,
        hotelRoomType5,
        hotelRoomType6,
        hotelRoomPrice,
        hotelRoomPrice2,
        hotelRoomPrice3,
        hotelRoomPrice4,
        hotelRoomPrice5,
        hotelRoomPrice6
      } = req.body;
      if (err) {
        res.sendStatus(400);
        return;
      }
      console.log(hotelRoomType);
      const hotelProfile = req.files["hotelProfile"][0].filename;
      const hotelPicture = req.files["hotelPicture"][0].filename;
      // const hotelRoomPicture = req.files["hotelRoomPicture"][0].filename;
      // const hotelRoomPicture2 = req.files["hotelRoomPicture2"][0].filename;
      // const hotelRoomPicture3 = req.files["hotelRoomPicture3"][0].filename;
      // const hotelRoomPicture4 = req.files["hotelRoomPicture4"][0].filename;
      // const hotelRoomPicture5 = req.files["hotelRoomPicture5"][0].filename;
      // const hotelRoomPicture6 = req.files["hotelRoomPicture6"][0].filename;
      const hotelId = await contactModel.insertNewHotel({
        hotelName,
        hotelDescription,
        hotelAddress,
        hotelTelNumber,
        hotelContactNumber,
        hotelEmail,
        hotelProfile,
        hotelPicture
      });
      await contactModel.insertNewHotelRoomType({
        hotelId,
        hotelRoomType,
        hotelRoomType2,
        hotelRoomType3,
        hotelRoomType4,
        hotelRoomType5,
        hotelRoomType6
      });
      await contactModel.insertNewHotelRoomPrice({
        hotelId,
        hotelRoomPrice,
        hotelRoomPrice2,
        hotelRoomPrice3,
        hotelRoomPrice4,
        hotelRoomPrice5,
        hotelRoomPrice6
      });
      // await contactModel.insertNewHotelRoomPicture({
      //   hotelRoomPicture,
      //   hotelRoomPicture2,
      //   hotelRoomPicture3,
      //   hotelRoomPicture4,
      //   hotelRoomPicture5,
      //   hotelRoomPicture6
      // });
    });
  } catch (error) {
    res.sendStatus(400);
    throw new Error(`[ERR] insertNewHotel: ${error}`);
  } finally {
    res.redirect("/contact/new-hotel-dashboard");
  }
};
exports.postAirlineInfo = async (req, res) => {
  try {
    multer.upload(req, res, async err => {
      const {
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
      } = req.body;
      if (err) {
        res.sendStatus(400);
        return;
      }
      const airlineProfile = req.files["airlineProfile"][0].filename;
      const airlinePicture = req.files["airlinePicture"][0].filename;
      await contactModel.insertNewAirline({
        airlineName,
        airlineNationality,
        airlineEmail,
        airlineDescription,
        airlineAddress,
        airlineTelNumber,
        airlineContactNumber,
        airlinePlaneDes,
        airlineProfile,
        airlinePicture,
        airlineSeatType,
        airlineSeatPrice
      });
    });
  } catch (error) {
    res.sentStatus(400);
    throw new Error(`[ERR] insertNewAirline: ${error}`);
  } finally {
    res.redirect("/contact/new-airline-dashboard");
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
  const hotelId = req.body.hotelId;
  try {
    const result = await db.query(`SELECT * FROM hotel WHERE hotelId = '${hotelId}' `);
    const data = JSON.stringify(result[0]);
    res.status(200);
    res.render("contact/new-hotel-detail", {
      pageTitle: "TravelAloha - Contact - New Hotel Detail",
      user: req.user,
      hotel: data
    });
  } catch (err) {
    res.sendStatus(400);
  }
};
exports.getAirlineDetail = async (req, res) => {
  const airline_Id = req.body.airline_Id;
  try {
    const result = await db.query(`SELECT * FROM airline WHERE airline_Id = '${airline_Id}' `);
    const data = JSON.stringify(result[0]);
    res.status(200);
    res.render("contact/new-airline-detail", {
      pageTitle: "TravelAloha - Contact - New Airline Detail",
      user: req.user,
      airline: data
    });
  } catch (err) {
    res.sendStatus(400);
  }
};
