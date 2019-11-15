const contactModel = require("../models/contact");
const db = require("../db/db");


exports.getIndex = (req, res) => {
    res.render('contact/index', {
        pageTitle: 'TravelAloha - Contact',
        user: req.user
    });
}
exports.getDashboard = (req, res) => {
    res.render('contact/dashboard', {
        pageTitle: 'TravelAloha - Contact - Dashboard',
        user: req.user
    });
}

exports.getAirlineInfo = (req, res) => {
    res.render('contact/add-new-airline', {
        pageTitle: 'TravelAloha - Contact - Register New Airline',
        user: req.user
    });
}
exports.getHotelInfo = (req, res) => {
    res.render('contact/add-new-hotel', {
        pageTitle: 'TravelAloha - Contact - Register New Hotel',
        user: req.user
    });
}
exports.postHotelInfo = async (req, res) => {
    const GAY  = {
        hotelId,
        hotelName,
        hotelDescription,
        hotelAddress,
        hotelTelNumber,
        hotelContactNumber,
        hotelEmail,
        hotelPicture,
        hotelLogo
      } = req.body;

      try {
        console.group(GAY.hotelDescription);

        await db.query(`INSERT INTO hotel (hotelName, hotelDescription, hotelAddress, hotelTelNumber, hotelContactNumber)  VALUES ('${GAY.hotelName}', '${GAY.hotelDescription}', '${GAY.hotelAddress}', '${GAY.hotelTelNumber}', '${GAY.hotelContactNumber}');`);
        res.send(GAY);
    } catch (error) {
        console.log("UR MOM GAY");
        throw new Error(`[ERR] insertNewHotel: ${error}`);
    }
}
exports.getHotelDetail = (req, res) => {
    res.render('contact/new-hotel-detail', {
        pageTitle: 'TravelAloha - Contact - New Hotel Detail',
        user: req.user
    });
}
