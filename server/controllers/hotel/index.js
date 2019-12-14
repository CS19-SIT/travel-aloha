const Hotel = require('../../models/hotel');
const db = require("../../db/db");

exports.getIndex = async (req, res) => {
    result = await db.query("SELECT hotelId,hotelName,hotelPicture FROM hotel LIMIT 6");

    res.render("landingpage_hotel/landingpage", {
        pageTitle: "Find Hotel",
        user: req.user,
        hotels: result[0]
    });
};


exports.getHotel = async (req, res) => {
    const { place, checkIn, checkOut, adult } = req.body;
    try {
        if (!place || !checkIn || !checkOut || !adult) { throw new Error();}


        const result = await db.query("SELECT * " +
            "FROM hotel as h, room_head  as r, room_detail as d " +
            "WHERE h.hotelId=r.hotelIdroom and r.roomDetailId=d.detailId and " +
            "hotelName LIKE '%"+place+"%' OR hotelAddress LIKE '%"+place+"%' and d.capacity <= "+adult+"");

        if (result[0].length < 1) {
            throw new Error(`Cannot find hotel in ${place}.`);
        }



        res.render("result/result", {
            pageTitle: "All result hotel for " + req.body.place,
            user: req.user,
            hotels: result[0],
            main_query: req.body
        });

    } catch (err) {
        console.log(err);
        console.log(place+" "+checkIn+" "+checkOut+" "+adult);
        res.redirect("/hotel");
    }
};


exports.findFilters = async (req, res) => {
    //plus filters
    const { place, checkIn, checkOut, persons } = req.body;
    try {
        if (!place || !checkIn || !checkOut || !persons) { throw new Error();}

        const result = await db.query("SELECT * " +
            "FROM hotel as h, room_head  as r, room_detail as d " +
            "WHERE h.hotelId=r.hotelIdroom and r.roomDetailId=d.detailId and " +
            "hotelName LIKE '%"+place+"%' OR hotelAddress LIKE '%"+place+"%' and d.capacity >= "+persons+"");

        const prices = await  db.query("SELECT min(d.fullPrice) as minPrice, max(d.fullPrice) as maxPrice " +
            "FROM hotel as h, room_head  as r, room_detail as d " +
            "WHERE h.hotelId=r.hotelIdroom and r.roomDetailId=d.detailId and " +
            "hotelName LIKE '%"+place+"%' OR hotelAddress LIKE '%"+place+"%' and d.capacity >= "+persons+"");

        if (result[0].length < 1) {
            console.log("Brak wyników");
            throw new Error(`Cannot find hotel in ${place}.`);
        }

        res.render("result/result", {
            pageTitle: "All result hotel for " + req.body.place,
            user: req.user,
            hotels: result[0],
            prices: prices[0]
        });
    } catch (err) {
        console.log(err);
        console.log(place+" "+checkIn+" "+checkOut+" "+persons);
        res.redirect("/hotel");
    }

};

