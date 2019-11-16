const db = require("../db/db");
exports.insertNewHotel = async ({
  hotelName,
  hotelEmail,
  hotelDescription,
  hotelAddress,
  hotelTelNumber,
  hotelContactNumber
}) => {
  try {
    await db.query(`INSERT INTO hotel(hotelName, hotelDescription, hotelAddress, hotelTelNumber, hotelContactNumber, hotelEmail) VALUES(?,?,?,?,?,?)`, [
      hotelName,
      hotelDescription,
      hotelAddress,
      hotelTelNumber,
      hotelContactNumber,
      hotelEmail
    ]);
  } catch (error) {
    throw new Error(`[ERR] insertNewHotel: ${error}`);
  }
};
exports.insertNewHotelFile = async({
  hotelPicture
}) => {
  try{
    await db.query(`INSERT INTO hotel(hotelPicture) VALUES(?)`, [
      hotelPicture
    ]);
  } catch(error){
    throw new Error(`[ERR] insertNewHotelFile: ${error}`)
  }
};
exports.insertNewAirline = async ({
  airlineName,
  airlineEmail,
  airlineAddress,
  airlineNationality,
  airlineTelNumber,
  airlineContactNumber,
  airlineDescription
}) => {
  try {
    await db.query(`INSERT INTO airline(airlineName, airlineNationality, airlineEmail, airlineDescription, airlineAddress, airlineTelNumber, airlineContactNumber) VALUES(?,?,?,?,?,?,?)`, [
      airlineName,
      airlineNationality,
      airlineEmail,
      airlineDescription,
      airlineAddress,
      airlineTelNumber,
      airlineContactNumber
    ]);
  } catch (error) {
    throw new Error(`[ERR] insertNewAirline: ${error}`);
  }
};
exports.getHotelInfo = async ({
  hotelId,
  hotelName,
  hotelDescription,
  hotelAddress,
  hotelTelNumber,
  hotelContactNumber,
  hotelEmail,
  hotelPicture,
  hotelLogo
}) => {
  try {
    await db.query("SELECT * FROM hotel", [
      hotelId,
      hotelName,
      hotelDescription,
      hotelAddress,
      hotelTelNumber,
      hotelContactNumber,
      hotelEmail,
      hotelPicture,
      hotelLogo
    ]);
  } catch (error) {
    throw new Error(`[ERR] getHotelInfo: ${err}`);
  }
};
exports.getAirlineInfo = async airlineInfo => {
  const {
    airline_Id,
    airlineName,
    airlineNationality,
    airlineEmail,
    airlineDescription,
    airlineAddress,
    airlineTelNumber,
    airlineContactNumber,
    airlinePicture,
    airlineLogo
  } = airlineInfo;
  try {
    await db.query("SELECT * FROM new_airline", [
      airline_Id,
      airlineName,
      airlineNationality,
      airlineEmail,
      airlineDescription,
      airlineAddress,
      airlineTelNumber,
      airlineContactNumber,
      airlinePicture,
      airlineLogo
    ]);
  } catch (err) {
    throw new Error(`[ERR] getAirlineInfo: ${err}`);
  }
};
exports.deleteHotelInfo = async hotelId => {
  try {
    await db.query("DELETE FROM hotel WHERE hotelId = ?", [hotelId]);
  } catch (err) {
    throw new Error(`[ERR] deleteHotelInfo: ${err}`);
  }
};
exports.deleteAirlineInfo = async airline_Id => {
  try {
    await db.query("DELETE FROM new_airline WHERE airline_Id = ?", [airline_Id]);
  } catch (err) {
    throw new Error(`[ERR] deleteAirlineInfo: ${err}`);
  }
};
exports.getSubHotelInfo = async (hotelName, hotelDescription, timestamp) => {
  try {
    await db.query("SELECT hotelName,hotelDescription,timestamp FROM hotel", [hotelName, hotelDescription, timestamp]);
  } catch (err) {
    throw new Error(`[ERR] getSubHotelInfo: ${err}`);
  }
};
exports.getSubAirlineInfo = async (airlineName, airlineDescription, timestamp) => {
  try {
    await db.query("SELECT airlineName,airlineDescription,timestamp FROM new_airline", [airlineName, airlineDescription, timestamp]);
  } catch (err) {
    throw new Error(`[ERR] getSubHotelInfo: ${err}`);
  }
};
