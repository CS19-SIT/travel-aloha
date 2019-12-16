const Flight = require("../../models/flight_info");
const db = require("../../db/db");

exports.getFlight = async (req, res) => {
  try {
    let searchFlight = await Flight.getData();
    res.render("flights", {
      pageTitle: "TravelAloha - Flight",
      user: req.user,
      searchFlight: searchFlight
    });
  } catch (err) {
      console.log(err)
    res.sendStatus(404);
  }
};
