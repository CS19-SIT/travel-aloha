const db = require("../db/db");
exports.insertNewHotel = async ({
  hotelName,
  hotelEmail,
  hotelDescription,
  hotelAddress,
  hotelTelNumber,
  hotelContactNumber,
  hotelProfile,
  hotelPicture
}) => {
  try {
    const result = await db.query(`INSERT INTO hotel(hotelName, hotelDescription, hotelAddress,
                    hotelTelNumber, hotelContactNumber, hotelEmail, 
                    hotelProfile, hotelPicture) VALUES(?,?,?,?,?,?,?,?)`, [
      hotelName,
      hotelDescription,
      hotelAddress,
      hotelTelNumber,
      hotelContactNumber,
      hotelEmail,
      hotelProfile,
      hotelPicture
    ]);
    return result[0].insertId;
  } catch (error) {
    throw new Error(`[ERR] insertNewHotel: ${error}`);
  }
};
exports.insertNewHotelRoomType = async({
  hotelId,
  hotelRoomType,
  hotelRoomType2,
  hotelRoomType3,
  hotelRoomType4,
  hotelRoomType5,
  hotelRoomType6
}) => {
  try{
    await db.query(`INSERT INTO hotel_contact_type(hotelId ,single_bed_1_type, single_bed_2_type, double_bed_1_type, double_bed_2_type, 
                  king_bed_1_type, king_bed_2_type) VALUES(?,?,?,?,?,?,?)`, [
        hotelId,
        hotelRoomType,
        hotelRoomType2,
        hotelRoomType3,
        hotelRoomType4,
        hotelRoomType5,
        hotelRoomType6
    ]);
  }catch (error) {
    throw new Error(`[ERR] insertNewHotelRoomType: ${error}`);
  }
};
exports.insertNewHotelRoomPrice = async({
  hotelId,
  hotelRoomPrice,
  hotelRoomPrice2,
  hotelRoomPrice3,
  hotelRoomPrice4,
  hotelRoomPrice5,
  hotelRoomPrice6
}) => {
  try{
    await db.query(`INSERT INTO hotel_contact_room(hotelId, single_bed_1_price, single_bed_2_price, double_bed_1_price, double_bed_2_price, 
                  king_bed_1_price, king_bed_2_price)  VALUES(?,?,?,?,?,?,?)`, [
        hotelId,
        hotelRoomPrice,
        hotelRoomPrice2,
        hotelRoomPrice3,
        hotelRoomPrice4,
        hotelRoomPrice5,
        hotelRoomPrice6
    ]);
  }catch (error) {
    throw new Error(`[ERR] insertNewHotelRoomPrice: ${error}`);
  }
};
exports.insertNewHotelRoomPicture = async({
  hotelId,
  hotelRoomPicture1,
  hotelRoomPicture2,
  hotelRoomPicture3,
  hotelRoomPicture4,
  hotelRoomPicture5,
  hotelRoomPicture6
}) => {
  try{
    await db.query(`INSERT INTO hotel_contact_picture(hotelId, single_bed_1, single_bed_2, double_bed_1, double_bed_2, 
                  king_bed_1, king_bed_2) VALUES(?,?,?,?,?,?,?)`, [
        hotelId,           
        hotelRoomPicture1,
        hotelRoomPicture2,
        hotelRoomPicture3,
        hotelRoomPicture4,
        hotelRoomPicture5,
        hotelRoomPicture6
    ]);
  }catch (error) {
    throw new Error(`[ERR] insertNewHotelRoomPrice: ${error}`);
  }
};
exports.getHotelDashboard = async () => {
  try {
    const result = await db.query(`SELECT * FROM hotel`);
    return result[0];
  } catch (err) {
    throw new Error(`[ERR] getHotelDashboard: ${err}`);
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
  airlinePlaneDes,
  airlineProfile,
  airlinePicture
}) => {
  try {
    await db.query(`INSERT INTO airline(airlineName, airlineNationality, airlineEmail, airlineDescription, 
                    airlineAddress, airlineTelNumber, airlineContactNumber, airlinePlaneDes, airlineProfile, 
                    airlinePicture,airlineSeatType,airlineSeatPrice) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`, [
      airlineName,
      airlineNationality,
      airlineEmail,
      airlineDescription,
      airlineAddress,
      airlineTelNumber,
      airlineContactNumber,
      airlinePlaneDes,
      airlineProfile,
      airlinePicture,
      airlineSeatType,
      airlineSeatPrice
    ]);
  } catch (error) {
    throw new Error(`[ERR] insertNewAirline: ${error}`);
  }
}
exports.getAirlineDashboard = async () => {
  try {
    const result = await db.query(`SELECT * FROM airline`);
    return result[0];
  } catch (err) {
    throw new Error(`[ERR] getAirlineDashboard: ${err}`);
  }
};