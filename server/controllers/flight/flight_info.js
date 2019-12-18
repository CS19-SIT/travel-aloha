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
      console.log(err);
      res.sendStatus(404);
  }
};

exports.getSearchFlight =  async (req,res) => {
  try {
    let flight_data = await Flight.search();
    res.render("flight/findFlight", {
      pageTitle : "TravelAloha - Search Flight",
      user : req.user,
      flight_data : flight_data
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
}
