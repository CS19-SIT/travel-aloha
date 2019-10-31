const db = require("../../db/db"); //connect to db
 // we also need roomid

exports.getHotelRoom = async (hotelId,roomId) => {
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
  exports.getRoom() =async(room){
    const {hotelIdroom,roomId}
    try {
      let roomiddetail = await db.query("select roomDetailId from room_head");
      const result = await db.query("select * from room_detail where detailId = ?",[roomiddetail]);
      if (result[0].length < 1) {
        throw new Error(`Cannot find your room ${RoomId},${hotelId}.`);
      } 
      return result[0][0]; 
    } catch (error) {
      throw new Error(`[ERR] getRoomID: ${err}`);
    }
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




 