const Hotel = require('../models/hotel');

exports.find = (req, res) =>
    res.render("results", {
        pageTitle: "TravelAloha results to go: "+req.body.place,
        user: req.user,
        //send results to model and prepare for view
    });