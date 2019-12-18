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
      console.log(hotelRoomType2);
      if (err) {
        res.sendStatus(400);
        return;
      }
      const hotelProfile = req.files["hotelProfile"][0].filename;
      const hotelPicture = req.files["hotelPicture"][0].filename;
      let [hotelRoomPicture1, hotelRoomPicture2, hotelRoomPicture3, hotelRoomPicture4, hotelRoomPicture5, hotelRoomPicture6] = [null, null, null, null, null, null];
      if ("hotelRoomPicture1" in req.files) {
        hotelRoomPicture1 = req.files["hotelRoomPicture1"][0].filename;
      }
      if ("hotelRoomPicture2" in req.files) {
        hotelRoomPicture2 = req.files["hotelRoomPicture2"][0].filename;
      }
      if ("hotelRoomPicture3" in req.files) {
        hotelRoomPicture3 = req.files["hotelRoomPicture3"][0].filename;
      }
      if ("hotelRoomPicture4" in req.files) {
        hotelRoomPicture4 = req.files["hotelRoomPicture4"][0].filename;
      }
      if ("hotelRoomPicture5" in req.files) {
        hotelRoomPicture5 = req.files["hotelRoomPicture5"][0].filename;
      }
      if ("hotelRoomPicture6" in req.files) {
        hotelRoomPicture6 = req.files["hotelRoomPicture6"][0].filename;
      }
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
      await contactModel.insertNewHotelRoomPicture({
        hotelId,
        hotelRoomPicture1,
        hotelRoomPicture2,
        hotelRoomPicture3,
        hotelRoomPicture4,
        hotelRoomPicture5,
        hotelRoomPicture6
      });
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
        airlinePlaneDes,
        airlineSeatMinPrice1,
        airlineSeatMaxPrice1,
        airlineSeatMinPrice2,
        airlineSeatMaxPrice2,
        airlineSeatMinPrice3,
        airlineSeatMaxPrice3
      } = req.body;
      if (err) {
        res.sendStatus(400);
        return;
      }
      const airlineProfile = req.files["airlineProfile"][0].filename;
      const airlinePicture = req.files["airlinePicture"][0].filename;
      let [airlineSeatTypePicture1, airlineSeatTypePicture2, airlineSeatTypePicture3] = [null, null, null];
      if ("airlineSeatTypePicture1" in req.files) {
        airlineSeatTypePicture1 = req.files["airlineSeatTypePicture1"][0].filename;
      }
      if ("airlineSeatTypePicture2" in req.files) {
        airlineSeatTypePicture2 = req.files["airlineSeatTypePicture2"][0].filename;
      }
      if ("airlineSeatTypePicture3" in req.files) {
        airlineSeatTypePicture3 = req.files["airlineSeatTypePicture3"][0].filename;
      }
     const airline_Id = await contactModel.insertNewAirline({
        airlineName,
        airlineNationality,
        airlineEmail,
        airlineDescription,
        airlineAddress,
        airlineTelNumber,
        airlineContactNumber,
        airlinePlaneDes,
        airlineProfile,
        airlinePicture
      });
      await contactModel.insertNewAirlineSeatPrice({
        airline_Id,
        airlineSeatMinPrice1,
        airlineSeatMaxPrice1,
        airlineSeatMinPrice2,
        airlineSeatMaxPrice2,
        airlineSeatMinPrice3,
        airlineSeatMaxPrice3
      })
      await contactModel.insertNewAirlineSeatPicture({
        airline_Id,
        airlineSeatTypePicture1,
        airlineSeatTypePicture2,
        airlineSeatTypePicture3
      })
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
    const result1 = await db.query(`SELECT * FROM hotel WHERE hotelId = '${hotelId}' `);
    const result2 = await db.query(`SELECT * FROM hotel_contact_type WHERE hotelId = '${hotelId}' `);
    const result3 = await db.query(`SELECT * FROM hotel_contact_room WHERE hotelId = '${hotelId}' `);
    const result4 = await db.query(`SELECT * FROM hotel_contact_picture WHERE hotelId = '${hotelId}' `);
    const data1 = JSON.stringify(result1[0]);
    const data2 = JSON.stringify(result2[0]);
    const data3 = JSON.stringify(result3[0]);
    const data4 = JSON.stringify(result4[0]);
    res.status(200);
    res.render("contact/new-hotel-detail", {
      pageTitle: "TravelAloha - Contact - New Hotel Detail",
      user: req.user,
      hotel: data1,
      hotelRoomType: data2,
      hotelRoomPrice: data3,
      hotelRoomPicture: data4
    });
  } catch (err) {
    res.sendStatus(400);
  }
};
exports.getAirlineDetail = async (req, res) => {
  const airline_Id = req.body.airline_Id;
  try {
    const result = await db.query(`SELECT * FROM airline WHERE airline_Id = '${airline_Id}' `);
    const result2 = await db.query(`SELECT * FROM airline_contact_price WHERE airline_Id = '${airline_Id}' `);
    const result3 = await db.query(`SELECT * FROM airline_contact_picture WHERE airline_Id = '${airline_Id}' `);
    const data = JSON.stringify(result[0]);
    const data2 = JSON.stringify(result2[0]);
    const data3 = JSON.stringify(result3[0]);
    res.status(200);
    res.render("contact/new-airline-detail", {
      pageTitle: "TravelAloha - Contact - New Airline Detail",
      user: req.user,
      airline: data,
      airlineSeatPrice: data2,
      airlineSeatPicture: data3
    });
  } catch (err) {
    res.sendStatus(400);
  }
};
