const db = require("../db/db");


exports.getHotelName = async ({
    userID
  }) => {
    try {
      console.log(userID);
      let resultHotelName = await db.query("SELECT * FROM hotel as h,booking_detail as bookde WHERE h.hotelid = bookde.hotelid_booking ", [
         userID
      ]);
      console.log(resultHotelName[0]);
      return resultHotelName[0];
    } catch (err) {
      throw new Error(`[ERR] createUser: ${err}`);
    }
  };