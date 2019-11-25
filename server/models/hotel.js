const db = require("../db/db");

exports.findHotelByPlace = async (place) => {
    try {
        console.log("trying");
        const result = await db.query("SELECT * FROM hotel WHERE hotelName LIKE '%"+place+"%' OR hotelAddress LIKE '%"+place+"%'");
        if (result[0].length < 1) {
            console.log("Brak wyników");
            throw new Error(`Cannot find hotel in ${place}.`);
        }

        return callback(results[0]);
    } catch (err) {
        throw new Error(`[ERR] findHotelByPlace: ${err}`);
    }
};

exports.getHotelRoomOne = async (hotelId,roomId) => {
    try {
      const result = await db.query("SELECT * FROM room WHERE hotelId_room = ? and roomId = ?", [
        hotelId,
        roomId
      ]);
      
      if (result[0].length < 1) {
        throw new Error(`Cannot find your room ${RoomId},${hotelId}.`);
      } 
      return result[0][0];
    } catch (err) {
      throw new Error(`[ERR] getHotelRoomID: ${err}`);
    }
  };
  
  exports.getAllRoomInHotel = async (hotelId)=>{
    try {
      const resultAll = await db.query("select * from hotel,room_head where hotelIdroom = ?",[hotelId]);
      if (result[0].length < 1) {
        throw new Error(`Cannot find your room ${hotelId}.`);
      } 
      return resultAll[0][0];
    } catch (err) {
      throw new Error(`[ERR] getHotelALlRoomID: ${err}`);
    }
  };
 
  exports.insertHotel = async(hotelName,hotelAddress,hotelPicture,hotelDesciption) => { 
     try {
        await db.query("Insert into hotel(hotelName,hotelAddress,hotelPicture,hotelDescription) "+
       "values(`?`,`?`,`?`,`?`)",[
        hotelName,hotelAddress,hotelPicture,hotelDesciption
       ]);
       
     } catch (error) {
      throw new Error(`[ERR] insertId: ${err}`);
     }
  }
  exports.deleteHotel = async(hotelId) => {
    //warning delete hotel will delete room 
    await db.query("delete from hotel where hotelId = ?",[hotelId]);
  }

  


  // exports.insertBooking_Head()
  // exports.insertroom() done
  // exports.editRoomfacility() done
  // exports.editRoomtype() done
  // exports.insertBooking_Detail(bookingId)
  // exports.getBookingDetail(bookingId)
  // exports.getHotelDetail
  // exports.getRoomDetail
  //exports.deleteRoom
  //exports.deleteHotel
  //exports.deleteBooking




 
