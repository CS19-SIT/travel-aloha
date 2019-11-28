const Flight = require("../../models/flight_info");

exports.getIndex = async (req, res) => {
  // const flightnumber = JSON.parse(req.body.olaola[0]);
  // info = await Flight.getFlightInfoByNumber(flightNumber);
  info = await Flight.getFlightInfoByNumber("cs00001");
  console.log(info);
  // console.log(req);
  res.render("flight_booking/flight_info", {
    pageTitle: "TravelAloha - Flight - Booking",
    user: req.user,
    flightNumber: info['Flight_number'],
    departureCity: info['dep_city'],
    dep: info['Departure'],
    depart_date: info['Dep_Date'],
    depart_day: info['Dep_Day'],
    destinationCity: info['des_city'],
    des: info['Destination'],
    depTime: info['Dep_time'],
    arrTime: info['Arr_time'],
    airline_logo: info['airline_logo'],
    airline_name: info['airlineName']

  });
}

exports.postIndex = (req, res) => {
  let flight_info = Flight.getFlightInfoByNumber("cs00001");
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

exports.getDonut = (req, res) => {
  try {
    const db = require('../../db/db');

    const ha = JSON.parse(req.body.olaola);
    console.log(ha+" eiei")
    //Do query statements using "req.body" value in here and send it back to Ajax 

    // U can also do Query statements in Ajax
    res.json({
      status: 200, // means OKKKKKKK
      data: ha
    })
  } catch {
    res.json({
      status: 400 // means error
    })
  }
}