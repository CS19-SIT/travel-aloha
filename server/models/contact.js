const db = require("../db/db");
exports.insertNewHotel = async ({
  hotelName,
  hotelEmail,
  hotelDescription,
  hotelAddress,
  hotelTelNumber,
  hotelContactNumber,
  hotelRoomType,
  hotelRoomPrice,
  hotelProfile,
  hotelPicture
}) => {
  try {
    await db.query(`INSERT INTO hotel(hotelName, hotelDescription, hotelAddress,
                    hotelTelNumber, hotelContactNumber, hotelEmail, hotelRoomType, hotelRoomPrice, 
                    hotelProfile, hotelPicture) VALUES(?,?,?,?,?,?,?,?,?,?)`, [
      hotelName,
      hotelDescription,
      hotelAddress,
      hotelTelNumber,
      hotelContactNumber,
      hotelEmail,
      hotelRoomType,
      hotelRoomPrice,
      hotelProfile,
      hotelPicture
    ]);
  } catch (error) {
    throw new Error(`[ERR] insertNewHotel: ${error}`);
  }
};
exports.getHotelDashboard= async() =>{
  try{
      const result = await db.query(`SELECT * FROM hotel`);
      return result[0];
  } catch (err) {
      throw new Error(`[ERR] getHotelDashboard: ${err}`);
  }
};
exports.getHotelDetailInfo = async() =>{
  try{
      const result = await db.query(`SELECT * FROM hotel`);
      return result[0][0];
  } catch (err) {
      throw new Error(`[ERR] getHotelDetailInfo: ${err}`);
  }
};
exports.deleteHotelInfo = async hotelId => {
  try {
    await db.query("DELETE FROM hotel WHERE hotelId = ?", [hotelId]);
  } catch (err) {
    throw new Error(`[ERR] deleteHotelInfo: ${err}`);
  }
};
exports.insertNewAirline = async ({
  airlineName,
  airlineEmail,
  airlineAddress,
  airlineNationality,
  airlineTelNumber,
  airlineContactNumber,
  airlineDescription,
  airlineSeatType,
  airlineSeatPrice,
  airlinePlaneDes
}) => {
  try {
    await db.query(`INSERT INTO airline(airlineName, airlineNationality, airlineEmail, airlineDescription, airlineAddress, airlineTelNumber, airlineContactNumber, airlineSeatType, airlineSeatPrice, airlinePlaneDes) VALUES(?,?,?,?,?,?,?,?,?,?)`, [
      airlineName,
      airlineNationality,
      airlineEmail,
      airlineDescription,
      airlineAddress,
      airlineTelNumber,
      airlineContactNumber,
      airlineSeatType,
      airlineSeatPrice,
      airlinePlaneDes
    ]);
  } catch (error) {
    throw new Error(`[ERR] insertNewAirline: ${error}`);
  }
};
exports.insertNewAirlineFile = async ({
  airlineProfile,
  airlinePicture
}) => {
  try {
    await db.query(`INSERT INTO hotel(airlineProfile, airlinePicture) VALUES(?,?)`, [
      airlineProfile,
      airlinePicture
    ]);
  } catch (error) {
    throw new Error(`[ERR] insertNewAirlineFile: ${error}`)
  }
};
exports.getAirlineDashboard = async() => {
  try {
      const result = await db.query(`SELECT * FROM airline`);
      return result[0];
  } catch (err) {
    throw new Error(`[ERR] getAirlineDashboard: ${err}`);
  }
};
exports.getAirlineDetailInfo = async() => {
  try {
      const result = await db.query(`SELECT * FROM airline`);
      return result[0];
  } catch (err) {
    throw new Error(`[ERR] getAirlineDetailInfo: ${err}`);
  }
};
exports.deleteAirlineInfo = async airline_Id => {
  try {
    await db.query("DELETE FROM new_airline WHERE airline_Id = ?", [airline_Id]);
  } catch (err) {
    throw new Error(`[ERR] deleteAirlineInfo: ${err}`);
  }
};
