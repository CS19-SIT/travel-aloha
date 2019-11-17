const Hotel = require('../models/hotel');

exports.find = async (req, res) => {
    const { place } = req.body;
    try {
        existedHotel = await Hotel.findHotelByPlace(place);
    } catch (err) {}
        if (existedHotel) throw new Error("Sorry, we couldn't find it.");
        else {
            res.render("result/result", {
                pageTitle: "All result hotel for " + req.body.place,
                user: req.user
            });
        }
    };
