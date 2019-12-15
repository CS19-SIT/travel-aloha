const Flight = require("../../models/flight_info");
const db = require("../../db/db");

exports.getFlight = async (req,res) => {
    try{
        let searchFlight = await Flight.search();
        res.render("Flights", {
            pageTitle : "TravelAloha -Search",
            user : req.user,
            searchFlight : searchFlight
        });
    }
    catch(err){
        res.sendStatus(404);
    }
}