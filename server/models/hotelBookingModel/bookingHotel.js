const db = require("../../db/db"); //connect to db

exports.insertBooking = async(booking)=>{
const {checkInDate,checkoutDate,firstname,lastname,userId,roomId,hotelId} = booking;
try {
    let result = await db.query("insert into booking_detail(firstName,lastName,userId_booking,roomId_booking,hotelId_booking) values ("?","?","?",?,?),
    [firstname,lastname,userId,roomId,hotelId]);
    await db.query("insert into booking_head(checkinDate,checkoutDate,bookingDetailid) values (?,?,?)",[checkInDate,checkoutDate,result[0]]);

} catch (error) {
    
};

}
exports.getBooking = async(bookingId) =>{
    try {
        let bookingDetailId = await db.query("select bookingDetailid from booking_head where bookingId = ?",[bookingId]);
        const result = await db.query("select * from booking_head where bookingId = ?",[bookingId]);
        const result2 = await db.query("selec * from booking_detail where bookingId_detail = ?",[bookingDetailId]);
        if (result[0].length < 1) {
            throw new Error(`Cannot find anybooking ${bookingId}.`);
          } 
          return result[0][0],result2[0][0];
        } catch (err) {
          throw new Error(`[ERR] getbookingID: ${err}`);
        }
};
exports.Deletebooking = async(bookingId) => {
    let bookingDetailId = await db.query("select bookingDetailid from booking_head where bookingId = ?",[bookingId]);
    await db.query("delete from booking_detail where bookingId_detail = ?",[bookingDetailId]);
    
}