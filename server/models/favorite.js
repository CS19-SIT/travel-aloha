const db = require("../db/db");

exports.getAllHotel = async () => {
    try {
      const count = await db.query(`SELECT * FROM fav_hotel as f,hotel as h WHERE f.favHotelID = h.hotelID`);
  
      return count[0];

    } catch (err) {
    throw new Error(`[ERR] getAllHotel: ${err}`);
    }
  };

  exports.getAllFlight = async () => {
    try {
      const count = await db.query(`SELECT * FROM fav_airline as f, airline as a WHERE f.airlineID = a.airline_id`);
  
      return count[0];

    } catch (err) {
    throw new Error(`[ERR] getAllFlight: ${err}`);
    }
  };

