const Booking = require("../../models/flight_booking");

exports.postIndex = async (req, res) => {
  const flightNumber = JSON.parse(req.body.selectedFlight);
  const seatClass = req.body.seatClass;
  const passager = req.body.passager;
  // console.log(passager);
  // console.log(seatClass);
  // console.log(flightNumber);
  info = await Booking.getFlightInfoByNumber(flightNumber);
  // console.log(info);
  let p = [1200,103220]
  let sum = await Booking.getSum(p);
  let total = [ sum,
              (sum*0.07).toFixed(0),
              (sum*1.07).toFixed(0)
            ]
  strP = await Booking.getStringPrice(p);
  strTotal = await Booking.getStringPrice(total);
  console.log(strP);
  console.log(strTotal);
  res.render("flight_booking/flight_info", {
    pageTitle: "TravelAloha - Flight - Booking",
    user: req.user,
    info: info,
    seatClass: seatClass,
    passager: passager,
    p: p,
    strP: strP,
    strSum: strTotal
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

exports.getTest = (req, res) =>
  res.render("flight_booking/testflight", {
    pageTitle: "TravelAloha - Flight - TEST",
    user: req.user
  });


exports.getContact = async (req, res) => {
  const info = JSON.parse(req.body.sendInfo);
  let p = [1200,103220]
  let sum = await Booking.getSum(p);
  let total = [ sum,
              (sum*0.07).toFixed(0),
              (sum*1.07).toFixed(0)
            ]
  strP = await Booking.getStringPrice(p);
  strTotal = await Booking.getStringPrice(total);
  // console.log("in contract now");
  // console.log(req.body.seatClass);
  res.render("flight_booking/contact_form", {
    pageTitle: "Contact information",
    user: req.user,
    passager: req.body.passager,
    info: info,
    seatClass: req.body.seatClass,
    p: p,
    strP: strP,
    strSum: strTotal
  });
}
 

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

exports.postUpsell = async (req, res) => {
  const Passagerinfo = JSON.parse(req.body.PassagerInfo);
  const allFee = JSON.parse(req.body.feeValue);
  const info = JSON.parse(req.body.sendInfo);
  // Booking.recordPassager(Passagerinfo);
  let p = [1200,103220]
  let sum = await Booking.getSum(p);
  let total = [ sum,
              (sum*0.07).toFixed(0),
              (sum*1.07).toFixed(0)
            ]
  strP = await Booking.getStringPrice(p);
  strTotal = await Booking.getStringPrice(total);
  // console.log(Passagerinfo);
  // console.log(allFee);
  // console.log(req.body.seatClass);
  res.render("flight_booking/upsell", {
    pageTitle: "booking",
    user: req.user,
    passager: req.body.passager,
    info: info,
    seatClass: req.body.seatClass,
    p: p,
    strP: strP,
    strSum: strTotal,
    passagerInfo: Passagerinfo
  });
}