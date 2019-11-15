const contactModel = require("../models/contact");


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
    const {
        hotelName,
        hotelEmail,
        hotelDescription,
        hotelAddress,
        hotelTelNumber,
        hotelContactNumber
    } = req.body;

    try {
        console.log(hotelName);
        await contactModel.insertNewHotel({
            hotelName, 
            hotelDescription, 
            hotelAddress, 
            hotelTelNumber,
            hotelContactNumber,
            hotelEmail
        });
        res.redirect('dashboard');
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
        throw new Error(`[ERR] insertNewHotel: ${error}`);
    }
}
exports.getHotelDetail = (req, res) => {
    res.render('contact/new-hotel-detail', {
        pageTitle: 'TravelAloha - Contact - New Hotel Detail',
        user: req.user
    });
}
