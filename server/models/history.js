const db = require("../db/db");


exports.getHotelName = async (
    userID
  ) => {
    try {
      //console.log(typeof userID);
      let resultHotelName = await db.query("select bd.firstName, bd.lastName, bh.timestamp,bh.checkinDate, bh.checkoutDate, h.hotelAddress, h.hotelName, h.hotelTelNumber, bd.bookingId_detail from booking_head as bh join (booking_detail as bd join hotel as h on h.hotelId = bd.hotelId_booking) on bookingId_detail = bh.bookingDetailid where userId_booking = ?;",
         [userID]
         );

      return resultHotelName[0];

    } catch (err) {
      throw new Error(`[ERR] createUser: ${err}`);
    }
    //console.log(this.getHotelName);
  };

  exports.getUser = async (userID) => {
    try {

      let resultUser = await db.query("select firstname, lastName, Level from user where user_id = ?;", [
         userID
        ]);
      return resultUser[0][0];

    } catch (err) {
      throw new Error(`[ERR] createUser: ${err}`);
    }
  }

  exports.getHotelData = async (userID) => {
    try {
      //console.log(typeof userID);
      let resultHotelName = await db.query
      ("SELECT checkinDate, checkoutDate, bh.timestamp, isPaid, h.hotelName,h.hotelAddress,h.hotelTelNumber,bookde.firstName,bookde.lastName FROM booking_head as bh ,hotel as h,booking_detail as bookde WHERE h.hotelid = bookde.hotelid_booking AND bh.bookingDetailid = bookde.bookingid_detail AND bookde.userid_booking = ? order by bh.timestampe"
      ,
      [
         userID

      ]);
      const resulthotel = await db.query("SELECT * FROM hotel")
      // console.log(resulthotel[0]);
      // console.log(resultHotelName[0]);
      return resultHotelName[0][0];

    } catch (err) {
      throw new Error(`[ERR] createUser: ${err}`);
    }
    // console.log(this.getHotelName);
  };
  exports.getFlightData = async (userID) => {
    try {
      //console.log(typeof userID);
      let resultFlight = await db.query("select Flight_booking_detail.Seat_Number,airlineName,Daily_Flight.Depart_Date,Flight.Flight_Number,Book_Date,Departure,Destination,flight_booking_head.Booking_ref from airline, Flight, Daily_Flight, Flight_booking_detail, flight_booking_head,customer where airline.airline_Id=Flight.Airline_ID AND Flight.Flight_Number=Daily_Flight.Flight_Number AND Flight_booking_detail.Flight_Number=Daily_Flight.Flight_Number AND Flight_booking_detail.Depart_Date=Daily_Flight.Depart_Date AND Flight_booking_detail.Booking_ref=flight_booking_head.Booking_ref AND customer.customer_id = ? order by Book_Date asc ;"
      , [userID]);
      //const resulthotel = await db.query("SELECT * FROM hotel")
      //console.log(resulthotel[0]);
      // console.log(resultFlight[0]);
      return resultFlight[0];

    } catch (err) {
      throw new Error(`[ERR] createUser: ${err}`);
    }
  };
