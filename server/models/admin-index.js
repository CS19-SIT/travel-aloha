const db = require("../db/db");
exports.countFamous = async () => {
    try {
      const count = await db.query(`select count(bookingId_detail) as countID , hotelName , hotelId_booking from booking_detail,hotel where hotelId_booking = hotelId group by hotelId_booking`);
  
      return count[0];

    } catch (err) {
    throw new Error(`[ERR] countFamous: ${err}`);
    }
  };
  exports.countHotelSaved = async () => {
    try {
      const count = await db.query(`select count(favHotelID) as countID from fav_hotel  `);
  
      return count[0];

    } catch (err) {
    throw new Error(`[ERR] countHotelSaved: ${err}`);
    }
  };
  exports.countFlightSaved = async () => {
    try {
      const count = await db.query(`select count(airlineID) as countID from fav_airline  `);
  
      return count[0];

    } catch (err) {
    throw new Error(`[ERR] countFlightSaved: ${err}`);
    }
  };
  exports.countHotelBooking = async () => {
    try {
      const count = await db.query(`select count(bookingId_detail) as countID from booking_detail  `);
  
      return count[0];

    } catch (err) {
    throw new Error(`[ERR] countFlightSaved: ${err}`);
    }
  };