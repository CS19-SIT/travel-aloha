const Flight = require("../../models/flight_info");

exports.getIndex = async (req, res) => {
  const flightNumber = JSON.parse(req.body.selectedFlight);
  const seatClass = req.body.seatClass;
  const passager = req.body.passager;
  console.log(passager);
  console.log(seatClass);
  console.log(flightNumber);
  info = await Flight.getFlightInfoByNumber(flightNumber);
  console.log(info);
  // console.log(req);
  res.render("flight_booking/flight_info", {
    pageTitle: "TravelAloha - Flight - Booking",
    user: req.user,
    info: info,
    seatClass: seatClass,
    passager: passager
    // flightNumber: info[0]['Flight_number'],
    // departureCity: info[0]['dep_city'],
    // dep: info[0]['Departure'],
    // depart_date: info[0]['Dep_Date'],
    // depart_day: info[0]['Dep_Day'],
    // destinationCity: info[0]['des_city'],
    // des: info[0]['Destination'],
    // depTime: info[0]['Dep_time'],
    // arrTime: info[0]['Arr_time'],
    // airline_logo: info[0]['airline_logo'],
    // airline_name: info[0]['airlineName']

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
    const ha = JSON.parse(req.body.selectedFlight);
    console.log(ha[0]+" eiei")
    res.render("flight_booking/renderTest",{
      pageTitle: "render Test",
      user: req.user,
      NIGGER: ha
    });
    //Do query statements using "req.body" value in here and send it back to Ajax 

    // U can also do Query statements in Ajax
    // res.json({
    //   status: 200, // means OKKKKKKK
    //   data: ha
    // })
  } catch {
    res.json({
      status: 400 // means error
    })
  }
}