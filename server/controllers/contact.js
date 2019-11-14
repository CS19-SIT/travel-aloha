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
exports.getHotelInfo = async(req, res) => {
    let data = contactModel.getHotelInfo;
    try{
        res.render('contact/add-new-hotel', {
            pageTitle: 'TravelAloha - Contact - Register New Hotel',
            user: req.user
        });
    }catch(err){
        res.sendStatus(404);
    }
}
exports.getHotelDetail = (req, res, next) => { 
    res.render('contact/new-hotel-detail', {
        pageTitle: 'TravelAloha - Contact - New Hotel Detail',
        user: req.user
    });
}
