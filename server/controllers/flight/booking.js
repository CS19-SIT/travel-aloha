const Flight = require("../../models/flight_info");

exports.getIndex = async (req, res) => {
  info = await Flight.getFlightInfoByNumber("cs00002");
  console.log(info);
  // console.log(req);
  res.render("flight_booking/flight_info", {
    pageTitle: "TravelAloha - Flight - Booking",
    user: req.user, 
    flightNumber: info['Flight_number'],
    departureCity: info['dep_city'],
    dep: info['Departure'],
    depart_date: info['Dep_Date'],
    destinationCity: info['des_city'],
    des: info['Destination'],
    depTime: info['Depart_Time']

  });
  console.log("getIndex");
}

exports.postIndex = (req, res) => {
  let flight_info = Flight.getFlightInfoByNumber("cs0001");
  console.log("postIndex");
  document.getElementById("flightNumber").innerHTML = "Paragraph changed!";
}

exports.getTest = (req, res) =>
  res.render("flight_booking/testflight", {
    pageTitle: "TravelAloha - Flight - TEST",
    user: req.user
  });

exports.getContact = (req, res) =>
  res.render("flight_booking/contact_form", {
    pageTitle: "Contact information",
    user: req.user
  });