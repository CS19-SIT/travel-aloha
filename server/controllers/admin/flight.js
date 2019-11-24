const moment = require("moment");
const Flight = require("../../models/flight");

exports.getIndex = async (req, res) => {
  const flightsData = await Flight.findAllFlightData();
  res.render("admin/admin-flight", {
    pageTitle: "Travel Aloha - Admin - Flight Management",
    user: req.user,
    flights: [
      ...flightsData.map(flight => ({
        ...flight,
        Arrive_Date: moment(flight.Arrive_Date).format("D MMMM YYYY"),
        Depart_Date: moment(flight.Depart_Date).format("D MMMM YYYY")
      }))
    ]
  });
};
