const db = require("../db/db");


exports.getHotelName = async (
    userID
  ) => {
    try {
      //console.log(typeof userID);
      let resultHotelName = await db.query("select hotelname,timestamp from user as u,booking_detail as bookde,room_head as rhead,hotel as h where bookde.roomId_booking = rhead.hotelidroom AND rhead.hotelIdroom = h.hotelId and u.user_id = ?;",
         [userID]
         );
      //const resulthotel = await db.query("SELECT * FROM hotel")
      //console.log(resulthotel[0]);
      //console.log(resultHotelName[1]);
      return resultHotelName[0][0];

    } catch (err) {
      throw new Error(`[ERR] createUser: ${err}`);
    }
    //console.log(this.getHotelName);
  };

  exports.getHotelData = async (userID) => {
    try {
      //console.log(typeof userID);
      let resultHotelName = await db.query("SELECT * FROM hotel as h,booking_detail as bookde WHERE h.hotelid = bookde.hotelid_booking AND bookde.userid_booking = ?", [
         userID
         
      ]);
      const resulthotel = await db.query("SELECT * FROM hotel")
      console.log(resulthotel[0]);
      console.log(resultHotelName[0]);
      return resultHotelName[0][0];

    } catch (err) {
      throw new Error(`[ERR] createUser: ${err}`);
    }
    console.log(this.getHotelName);
  };
  exports.getfightData = async (userID) => {
    try {
      //console.log(typeof userID);
      let resultHotelName = await db.query("select airlineName,fde.flight_number,book_date,Depart_Date,Depart_Time,Arrive_Date,Arrive_Time,Departure,Destination from Flight as f,user as u , flight_booking_head as fbook ,Flight_booking_detail as fde , airline as al where ? = fbook.customer_id and fbook.booking_ref = fde.booking_ref and f.Flight_number = fde.flight_number and f.Airline_ID = al.airline_Id;"
      , [userID
         
      ]);
      //const resulthotel = await db.query("SELECT * FROM hotel")
      //console.log(resulthotel[0]);
      console.log(resultHotelName[0]);
      return resultHotelName[0];

    } catch (err) {
      throw new Error(`[ERR] createUser: ${err}`);
    }
    console.log(this.getHotelName);
  };

