const page = require("../../models/landingPage");
const admin = require("../../models/admin-index");

exports.getIndex = async (req, res) => {
  try{
    let data = await page.countUsers();  
    let dataHotel = await page.countHotel();
   let dataPlace = await page.countFlight();
   let famousData = await admin.countFamous();
   let savedHotel = await admin.countHotelSaved();
   let savedFlight = await admin.countFlightSaved();
   let countHotel = await admin.countHotelBooking();
    res.render("adminDash/adminDash", {
      pageTitle: "TravelAloha - Admin Dashboard",
      user: req.user,
      data: data,
      dataHotel: dataHotel,
      dataPlace: dataPlace,
      famousData : famousData,
      savedHotel : savedHotel,
      savedFlight:savedFlight,
      countHotel:countHotel
      
    });
  }catch(err){
    res.sendStatus(404);
  }
      
  };
