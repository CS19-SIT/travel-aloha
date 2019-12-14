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
    await db.query(`INSERT INTO hotel(hotelName, hotelDescription, hotelAddress,
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
  } catch (error) {
    throw new Error(`[ERR] insertNewHotel: ${error}`);
  }
};
exports.insertNewHotelRoomType = async ({
  hotelRoomType
}) => {
  try {
    await db.query(`INSERT INTO room_detail(typeOfRoom) VALUES(?)`, [
      hotelRoomType
    ]);
  } catch (error) {
    throw new Error(`[ERR] insertNewHotelRoom: ${error}`);
  }
};
exports.insertNewHotelRoomPrice = async ({
  hotelRoomPrice,
  hotelRoomType
}) => {
  try {
    if(hotelRoomType == "1 Single-bed"){
      await db.query(`INSERT INTO hotel_contact_room(single_bed_1_price) VALUES(?)`, [
        hotelRoomPrice
      ]);
    }else if( hotelRoomType == "2 Single-bed" ){
      await db.query(`INSERT INTO hotel_contact_room(single_bed_2_price) VALUES(?)`, [
        hotelRoomPrice
      ]);
    }else if( hotelRoomType == "1 Double-Bed" ){
      await db.query(`INSERT INTO hotel_contact_room(double_bed_1_price) VALUES(?)`, [
        hotelRoomPrice
      ]);
    }else if( hotelRoomType == "2 Double-Bed" ){
      await db.query(`INSERT INTO hotel_contact_room(double_bed_2_price) VALUES(?)`, [
        hotelRoomPrice
      ]);
    }else if( hotelRoomType == "1 King size-bed" ){
      await db.query(`INSERT INTO hotel_contact_room(king_bed_1_price) VALUES(?)`, [
        hotelRoomPrice
      ]);
    }else if( hotelRoomType == "2 King size-bed" ){
      await db.query(`INSERT INTO hotel_contact_room(king_bed_2_price) VALUES(?)`, [
        hotelRoomPrice
      ]);
    }
  } catch (error) {
    throw new Error(`[ERR] insertNewHotelRoomPrice: ${error}`);
  }
};
exports.insertNewHotelRoomPicture = async ({
  hotelRoomPicture,
  hotelRoomType
}) => {
  try {
    if(hotelRoomType == "1 Single-bed"){
      await db.query(`INSERT INTO hotel_contact_picture(single_bed_1) VALUES(?)`, [
        hotelRoomPicture
      ]);
    }else if( hotelRoomType == "2 Single-bed" ){
      await db.query(`INSERT INTO hotel_contact_picture(single_bed_2) VALUES(?)`, [
        hotelRoomPicture
      ]);
    }else if( hotelRoomType == "1 Double-Bed" ){
      await db.query(`INSERT INTO hotel_contact_picture(double_bed_1) VALUES(?)`, [
        hotelRoomPicture
      ]);
    }else if( hotelRoomType == "2 Double-Bed" ){
      await db.query(`INSERT INTO hotel_contact_picture(double_bed_2) VALUES(?)`, [
        hotelRoomPicture
      ]);
    }else if( hotelRoomType == "1 King size-bed" ){
      await db.query(`INSERT INTO hotel_contact_picture(king_bed_1) VALUES(?)`, [
        hotelRoomPicture
      ]);
    }else if( hotelRoomType == "2 King size-bed" ){
      await db.query(`INSERT INTO hotel_contact_picture(king_bed_2) VALUES(?)`, [
        hotelRoomPicture
      ]);
    }
  } catch (error) {
    throw new Error(`[ERR] insertNewHotelRoomPicture: ${error}`);
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
  airlinePlaneDes,
  airlineProfile,
  airlinePicture
}) => {
  try {
    await db.query(`INSERT INTO airline(airlineName, airlineNationality, airlineEmail, airlineDescription, 
                    airlineAddress, airlineTelNumber, airlineContactNumber, airlinePlaneDes, airlineProfile, 
                    airlinePicture) VALUES(?,?,?,?,?,?,?,?,?,?)`, [
      airlineName,
      airlineNationality,
      airlineEmail,
      airlineDescription,
      airlineAddress,
      airlineTelNumber,
      airlineContactNumber,
      airlinePlaneDes,
      airlineProfile,
      airlinePicture
    ]);
  } catch (error) {
    throw new Error(`[ERR] insertNewAirline: ${error}`);
  }
};
exports.getAirlineDashboard = async () => {
  try {
    const result = await db.query(`SELECT * FROM airline`);
    return result[0];
  } catch (err) {
    throw new Error(`[ERR] getAirlineDashboard: ${err}`);
  }
};