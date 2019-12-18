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
  exports.getHotelFavID = async () => {
    try {
      const count = await db.query(`SELECT * from fav_hotel`);
  
      return count[0];

    } catch (err) {
    throw new Error(`[ERR] getHotelFavID: ${err}`);
    }
  };
 
 
exports.savedFavorites = async ({
  favHotelID,
  favUserID
})=> {
  try{
 
    console.log(favHotelID);
    await db.query(`INSERT INTO fav_hotel(favHotelID,favUserID) VALUES(?,?)`,[
      favHotelID,
      favUserID
    ]);

  }catch(err){
    throw new Error(`[ERR] savedFavorites: ${err}`)
  }
  
};
 
exports.deleteFavorites = async ({
  favHotelID,
  favUserID
})=> {
  try{
 
    console.log(favHotelID);
    await db.query(`DELETE FROM fav_hotel WHERE favHotelID = ? and favUserID = ?`,[
      favHotelID,
      favUserID
    ]);

  }catch(err){
    throw new Error(`[ERR] savedFavorites: ${err}`)
  }
  
};

exports.savedFlight = async ({
  flightID,
  favUserID
})=> {
  try{
 
    await db.query(`INSERT INTO fav_flight(flightID,favUserID) VALUES(?,?)`,[
      flightID,
      favUserID
    ]);

  }catch(err){
    throw new Error(`[ERR] savedFlight: ${err}`)
  }
  
};


exports.deleteFlight = async ({
  flightID,
  favUserID
})=> {
  try{
 
    await db.query(`DELETE FROM fav_flight WHERE flightID = ? and favUserID = ?`,[
      flightID,
      favUserID
    ]);

  }catch(err){
    throw new Error(`[ERR] deleteFlight: ${err}`)
  }
  
};