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

exports.getSearchFlight = async (req, res) => {
  const { origin, destination, seat_class, check_in, price, airline, airport } = req.body;
  try {

   if (!origin | !destination | !check_in ){
            throw new Error();
        }
        const result = await db.query("select f.Departure,f.Destination,a.airlineName,air.Airport_name,df.Depart_date,df.Depart_Time,df.Arrive_Date,df.Arrive_Time,se.Class,se.Price from Flight as f, airline as a, Airport as air, Daily_Flight as df, Seat_Price as se where f.Airline_ID = a.airline_Id and air.Airport_ID = f.destination and  f.Destination like '%"+destination+"' and f.Departure like '%"+origin+"' and se.Class like '%"+seat_class+"' and df.Depart_Date like '%"+check_in+"' and se.Price < "+ price +" and a.airlineName = '" + airline + "' and air.Airport_name = '" +airport+ "'  order by se.Price asc;");

  
        // console.log(result[0]);
    res.render("flight/findFlight", {
      pageTitle: "Search Flight " + req.body.destination,
      user: req.user,
      flight_data: result[0]
    });
  } catch (err) {
    console.log(err);
    // console.log(origin + " " + destination + " " + check_in + " " + seat_class);
    res.redirect("/flight");
  }


};
