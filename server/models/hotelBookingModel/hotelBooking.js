const db = require("../../db/db"); //connect to db
 // we also need roomid

exports.findHotelAndRoom = async (hotelId,roomId) => {
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
      throw new Error(`[ERR] findUserByHotelIDandRoomID: ${err}`);
    }
  };

 