const Hotel = require('../models/hotel');
const db = require("../db/db");

exports.index = async (req, res) => {
    result = await db.query("SELECT hotelId,hotelName,hotelPicture FROM hotel LIMIT 6");

    res.render("landingpage_hotel/landingpage", {
        pageTitle: "Find Hotel",
        user: req.user,
        hotels: result[0]
    });
};

exports.find = async (req, res) => {
    const { place, checkIn, checkOut, persons } = req.body;
    try {
        if (!place || !checkIn || !checkOut || !persons) { throw new Error();}

        const result = await db.query("SELECT * FROM hotel WHERE hotelName LIKE '%"+place+"%' OR hotelAddress LIKE '%"+place+"%'");
        if (result[0].length < 1) {
            console.log("Brak wyników");
            throw new Error(`Cannot find hotel in ${place}.`);
        }
        res.render("result/result", {
                pageTitle: "All result hotel for " + req.body.place,
                user: req.user,
                hotels: result[0]
            });
    } catch (err) {
        console.log(err);
        console.log(place+" "+checkIn+" "+checkOut+" "+persons);
        res.redirect("/hotel");
    }
};
