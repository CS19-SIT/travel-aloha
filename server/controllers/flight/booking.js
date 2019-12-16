const Booking = require("../../models/flight_booking");
const rg = require('rangen');

exports.getTest = (req, res) =>
  res.render("flight_booking/testflight", {
    pageTitle: "TravelAloha - Flight - TEST",
    user: req.user
  });

exports.postIndex = async (req, res) => {
  const flightNumber = JSON.parse(req.body.selectedFlight);
  const seatClass = req.body.seatClass[0];
  const passager = req.body.passager;
  // console.log(passager);
  console.log(seatClass);
  console.log(flightNumber);
  info = await Booking.getFlightInfoByNumber(flightNumber,seatClass);
  Booking.createSeat(flightNumber,seatClass);
  // console.log(info);
  let p = []
  for(i=0 ; i<info.length ; i++){
    p[i]=info[i]['price']*passager;
  }
  let sum = await Booking.getSum(p);
  let total = [ sum,
              (sum*0.07).toFixed(0),
              (sum*1.07).toFixed(0)
            ]
  strP = await Booking.getStringPrice(p);
  strTotal = await Booking.getStringPrice(total);
  console.log(strP);
  console.log(strTotal);
  p = JSON.stringify(p);
  res.render("flight_booking/flight_info", {
    pageTitle: "TravelAloha - Flight - Booking",
    user: req.user,
    info: info,
    seatClass: seatClass,
    passager: passager,
    p: p,
    strP: strP,
    strSum: strTotal,
    total: total
  });
}

exports.getContact = async (req, res) => {
  const info = JSON.parse(req.body.sendInfo);
  const seatClass = req.body.seatClass;
  const passager = req.body.passager;
  let p = []
  for(i=0 ; i<info.length ; i++){
    p[i]=info[i]['price']*passager;
  }
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
    passager: passager,
    info: info,
    seatClass: seatClass,
    p: p,
    strP: strP,
    total: total,
    strSum: strTotal,
  });
}
 
exports.postUpsell = async (req, res) => {
  passager = req.body.passager
  seatClass = req.body.seatClass;
  const Passagerinfo = JSON.parse(req.body.PassagerInfo);
  const allFee = JSON.parse(req.body.feeValue);
  const info = JSON.parse(req.body.sendInfo);

  // console.log(Passagerinfo[0]);
  Booking.recordPassager(Passagerinfo,seatClass);
  let p = [];
  for(i=0 ; i<info.length ; i++){
    p[i]=info[i]['price']*passager;
  }
  let sum = await Booking.getSum(p);
  let total = [ sum,
              (sum*0.07).toFixed(0),
              (sum*1.07).toFixed(0)
            ]
  strP = await Booking.getStringPrice(p);
  strTotal = await Booking.getStringPrice(total);
  let upsell = [];
  let seat = [];
  // console.log(info);
  for(var i=0 ; i<info.length ; i++){
    upsell[i] = await Booking.getUpsell(info[i]['Flight_number']);

    seat[i] = await Booking.getSeat(info[i]['Flight_number'],info[i]['nor_Depart_Date'],seatClass);
  }
  var reserveSeat = [];
  for(var i=0 ; i<info.length ; i++)
  {
    reserveSeat[i] = new Array(Passagerinfo.length);
    for(var j=0 ; j<Passagerinfo.length ; j++)
    {
      for(var k=0 ; k<seat[i].length ; k++)
      {
        if(seat[i][k]['Ava']==1)
        {
          reserveSeat[i][j]={
            fname: Passagerinfo[j]['fname'],
            lname: Passagerinfo[j]['lname'],
            flight: info[i]['Flight_number'],
            dep_date: info[i]['nor_Depart_Date'],
            seat: seat[i][k]['Seat_Number']
          }
          seat[i][k]['Ava'] = 0;
          console.log(seat[i][k]['Seat_Number']);
          break;
        }
      }
    }
  }
  console.log(upsell);

  res.render("flight_booking/upsell", {
    pageTitle: "booking",
    user: req.user,
    passager: passager,
    info: info,
    seatClass: seatClass,
    p: p,
    strP: strP,
    total: total,
    strSum: strTotal,
    passagerInfo: Passagerinfo,
    upsell: upsell,
    reserveSeat: reserveSeat,
    contact: req.body.contact
  });
}

exports.postPayment = async (req, res) => {
  passager = req.body.passager
  seatClass = req.body.seatClass;
  const Passagerinfo = req.body.PassagerInfo;
  const info = req.body.sendInfo;
  totalpay = req.body.totalpay;
  upsellData = req.body.upsellData;
  upsell = req.body.upsell;
  const book_ref = rg.id({length: 8, str: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
  console.log(req.user);
  res.render("flight_booking/payment", {
    pageTitle: "booking",
    user: req.user,
    passager: passager,
    info: info,
    seatClass: seatClass,
    totalpay: totalpay,
    passagerInfo: Passagerinfo,
    upsell: upsell,
    upsellData: upsellData,
    reserveSeat: req.body.reserveSeat,
    contact: req.body.contact,
    book_ref: book_ref
  });
}

exports.postThankyou = async (req, res) => {
  passager = req.body.passager
  seatClass = req.body.seatClass;
  const Passagerinfo = JSON.parse(req.body.PassagerInfo);
  const book_ref = req.body.book_ref
  const info = JSON.parse(req.body.sendInfo);
  const upsell = JSON.parse(req.body.upsell);
  const upsellData = JSON.parse(req.body.upsellData);
  const reserveSeat = JSON.parse(req.body.reserveSeat);
  const contact = JSON.parse(req.body.contact);
  totalpay = req.body.totalpay;
  const user = req.user;
  console.log(upsell);
  Booking.recordBookingHead(contact,req.user.user_id,book_ref);
  Booking.recordBookingdetail(reserveSeat,book_ref);
  Booking.recordBookingUpsell(upsell,upsellData,book_ref,Passagerinfo,info);
  res.render("flight_booking/thankyou", {
    pageTitle: "thank you",
    user: user,
    passager: passager,
    info: info,
    seatClass: seatClass,
    totalpay: totalpay,
    passagerInfo: Passagerinfo,
    upsell: upsell,
    reserveSeat: reserveSeat,
    contact: contact,
    book_ref: book_ref
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
