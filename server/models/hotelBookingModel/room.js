const db = require("../../db/db"); //connect to db
exports.insertRoom = async(hotelId,roomid,roomidDetail) =>{
   try {
      await db.query("insert into room_head(hotelIdroom,roomId,roomDetailId) values (?,?,?)"
     [hotelId,roomid,roomidDetail] );
    } catch (error) {
      
    }
  }// dont know how to response the detailId that created yet
  exports.insertRoomDetail = async(room)=>{
    try {
      const {price,roomPicture,type,capacity,wifi,breakfast,carpark,waterHeater} = room;
      await db.query("insert into room_detail(price,roompicture,typeOfRoom,wifi,breakfast,carpark,waterheater,capacity) values (?,"?","?",?,?,?,?,?"),
      [price,roomPicture,type,wifi,breakfast,carpark,waterHeater,capacity]);
     
    } catch (error) {
      
    }
  }
  
exports.editRoomfacility= async(room)=>{
try {
  const {roomdetailId,wifi,breakfast,carpark,waterHeater} = room;
  // to check if all 
  await db.query("update room_detail set wifi=?,breakfast=?,carpark=?,waterheater=? where detailId=?",[wifi,breakfast,carpark,waterHeater,roomdetailId]);
} catch (error) {
  
}

}
exports.editRoomtype = async(room)=>{
  try {
    const {roomdetailId,type} = room;
    await db.query("update room_detail set typeOfRoom=? where detailId=?",[type,roomdetailId]);
  } catch (error) {
    
  }
}