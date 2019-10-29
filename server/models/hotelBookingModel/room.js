const db = require("../../db/db"); //connect to db
exports.insertRoom = async(hotelId,room){
    const {id,price,roomPicture,type,capacity,wifi,breakfast,carpark,waterHeater} = room;
    try {
      await db.query("insert into room(roomId,price,roompicture) values(?,?,?)",[id,price,roomPicture]);
      //await db.query("insert into room")
    } catch (error) {
      
    }
  }