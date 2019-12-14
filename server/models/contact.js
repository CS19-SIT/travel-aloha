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
exports.insertNewHotelRoom = async({
  hotelRoomType,
  hotelRoomPrice
}) => {
  try {
    await db.query(`INSERT INTO room_detail(fullPrice, typeOfRoom) VALUES(?,?)`, [
      hotelRoomPrice,
      hotelRoomType
    ]);
  } catch (error) {
    throw new Error(`[ERR] insertNewHotelRoom: ${error}`);
  }
};
// exports.insertNewHotelRoomType = async ({
//   hotelRoomType
// }) => {
//   try {
//     await db.query(`INSERT INTO room_detail(typeOfRoom) VALUES(?)`, [
//       hotelRoomType
//     ]);
//   } catch (error) {
//     throw new Error(`[ERR] insertNewHotelRoom: ${error}`);
//   }
// };
// exports.insertNewHotelRoomType2 = async ({
//   hotelRoomType2
// }) => {
//   try {
//     await db.query(`INSERT INTO room_detail(typeOfRoom) VALUES(?)`, [
//       hotelRoomType2
//     ]);
//   } catch (error) {
//     throw new Error(`[ERR] insertNewHotelRoom: ${error}`);
//   }
// };
// exports.insertNewHotelRoomType3 = async ({
//   hotelRoomType3
// }) => {
//   try {
//     await db.query(`INSERT INTO room_detail(typeOfRoom) VALUES(?)`, [
//       hotelRoomType3
//     ]);
//   } catch (error) {
//     throw new Error(`[ERR] insertNewHotelRoom: ${error}`);
//   }
// };
// exports.insertNewHotelRoomType4 = async ({
//   hotelRoomType4
// }) => {
//   try {
//     await db.query(`INSERT INTO room_detail(typeOfRoom) VALUES(?)`, [
//       hotelRoomType4
//     ]);
//   } catch (error) {
//     throw new Error(`[ERR] insertNewHotelRoom: ${error}`);
//   }
// };
// exports.insertNewHotelRoomType5 = async ({
//   hotelRoomType5
// }) => {
//   try {
//     await db.query(`INSERT INTO room_detail(typeOfRoom) VALUES(?)`, [
//       hotelRoomType5
//     ]);
//   } catch (error) {
//     throw new Error(`[ERR] insertNewHotelRoom: ${error}`);
//   }
// };
// exports.insertNewHotelRoomType6 = async ({
//   hotelRoomType6
// }) => {
//   try {
//     await db.query(`INSERT INTO room_detail(typeOfRoom) VALUES(?)`, [
//       hotelRoomType6
//     ]);
//   } catch (error) {
//     throw new Error(`[ERR] insertNewHotelRoom: ${error}`);
//   }
// };
// exports.insertNewHotel1SingleBedRoomPrice = async ({
//   hotelRoomPrice
// }) => {
//   try {
//       await db.query(`INSERT INTO hotel_contact_room(single_bed_1_price) VALUES(?)`, [
//         hotelRoomPrice
//       ]);
//   } catch (error) {
//     throw new Error(`[ERR] insertNewHotel1SingleBedRoomPrice: ${error}`);
//   }
// };
// exports.insertNewHotel2SingleBedRoomPrice = async ({
//   hotelRoomPrice2
// }) => {
//   try {
//       await db.query(`INSERT INTO hotel_contact_room(single_bed_2_price) VALUES(?)`, [
//         hotelRoomPrice2
//       ]);
//   } catch (error) {
//     throw new Error(`[ERR] insertNewHotel2SingleBedRoomPrice: ${error}`);
//   }
// };
// exports.insertNewHotel1DoubleBedRoomPrice = async ({
//   hotelRoomPrice3
// }) => {
//   try {
//       await db.query(`INSERT INTO hotel_contact_room(double_bed_1_price) VALUES(?)`, [
//         hotelRoomPrice3
//       ]);
//   } catch (error) {
//     throw new Error(`[ERR] insertNewHotel1DoubleBedRoomPrice: ${error}`);
//   }
// };
// exports.insertNewHotel2DoubleBedRoomPrice = async ({
//   hotelRoomPrice4
// }) => {
//   try {
//       await db.query(`INSERT INTO hotel_contact_room(double_bed_2_price) VALUES(?)`, [
//         hotelRoomPrice4
//       ]);
//   } catch (error) {
//     throw new Error(`[ERR] insertNewHotel2DoubleBedRoomPrice: ${error}`);
//   }
// };
// exports.insertNewHotel1KingBedRoomPrice = async ({
//   hotelRoomPrice5
// }) => {
//   try {
//       await db.query(`INSERT INTO hotel_contact_room(king_bed_2_price) VALUES(?)`, [
//         hotelRoomPrice5
//       ]);
//   } catch (error) {
//     throw new Error(`[ERR] insertNewHotel1KingBedRoomPrice: ${error}`);
//   }
// };
// exports.insertNewHotel2KingBedRoomPrice = async ({
//   hotelRoomPrice6
// }) => {
//   try {
//       await db.query(`INSERT INTO hotel_contact_room(king_bed_2_price) VALUES(?)`, [
//         hotelRoomPrice6
//       ]);
//   } catch (error) {
//     throw new Error(`[ERR] insertNewHotel2KingBedRoomPrice: ${error}`);
//   }
// };
// exports.insertNewHotelRoomPicture = async ({
//   hotelRoomPicture,
//   hotelRoomType
// }) => {
//   try {
//     if(hotelRoomType == "1 Single-bed"){
//       await db.query(`INSERT INTO hotel_contact_picture(single_bed_1) VALUES(?)`, [
//         hotelRoomPicture
//       ]);
//     }else if( hotelRoomType == "2 Single-bed" ){
//       await db.query(`INSERT INTO hotel_contact_picture(single_bed_2) VALUES(?)`, [
//         hotelRoomPicture
//       ]);
//     }else if( hotelRoomType == "1 Double-Bed" ){
//       await db.query(`INSERT INTO hotel_contact_picture(double_bed_1) VALUES(?)`, [
//         hotelRoomPicture
//       ]);
//     }else if( hotelRoomType == "2 Double-Bed" ){
//       await db.query(`INSERT INTO hotel_contact_picture(double_bed_2) VALUES(?)`, [
//         hotelRoomPicture
//       ]);
//     }else if( hotelRoomType == "1 King size-bed" ){
//       await db.query(`INSERT INTO hotel_contact_picture(king_bed_1) VALUES(?)`, [
//         hotelRoomPicture
//       ]);
//     }else if( hotelRoomType == "2 King size-bed" ){
//       await db.query(`INSERT INTO hotel_contact_picture(king_bed_2) VALUES(?)`, [
//         hotelRoomPicture
//       ]);
//     }
//   } catch (error) {
//     throw new Error(`[ERR] insertNewHotelRoomPicture: ${error}`);
//   }
// };
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