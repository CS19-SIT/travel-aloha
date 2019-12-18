const db = require("../db/db"); //connect to db
exports.insertBooking = async booking => {
  const [
    FirstName,
    LastName,
    Email,
    PhoneNo,
    user_id,
    checkInDate,
    checkOutDate,
    hotelID,
    roomID,
    hotelFullPrice,
    hotelSalePrice
  ] = booking;
  try {
    let book_detail = await db.query(
      "insert into booking_detail(firstName,lastName,email,phoneNumber,userId_booking,roomId_booking,hotelId_booking,salePrice,fullPrice) values (?,?,?,?,?,?,?,?,?)",
      [FirstName, LastName, Email, PhoneNo, user_id, roomID, hotelID, hotelSalePrice, hotelFullPrice]
    );
    let book_head = await db.query(
      "insert into booking_head(checkinDate,checkoutDate,bookingDetailid) values (?,?,?)",
      [checkInDate, checkOutDate, book_detail[0].insertId]
    );
    return book_head[0].insertId;
  } catch (error) {
    throw new Error(`[ERR] insertBooking: ${error}`);
  }
};
exports.checkValid = async booking =>{
  const [
    FirstName,
    LastName,
    Email,
    PhoneNo,
    user_id,
    checkInDate,
    checkOutDate,
    hotelID,
    roomID,
    hotelFullPrice,
    hotelSalePrice
  ] = booking;
  try {
    let dbCheck = await db.query(
      "select * from (select * from booking_head where checkinDate = ? and checkoutDate = ?) as bookhead,(select * from booking_detail) as bookdetail where bookhead.bookingDetailid =bookdetail.bookingId_detail "
    )
    if(dbCheck[0].length < 1){
     return true;}
     else { return false};


  } catch (error) {
    
  }
}
exports.getBooking = async bookingId => {
  try {
    let bookingDetailId = await db.query(
      "select bookingDetailid from booking_head where bookingId = ?",
      [bookingId]
    );
    const result = await db.query(
      "select * from booking_head where bookingId = ?",
      [bookingId]
    );
    const result2 = await db.query(
      "select * from booking_detail where bookingId_detail = ?",
      [bookingDetailId]
    );
    if (result[0].length < 1) {
      throw new Error(`Cannot find anybooking ${bookingId}.`);
    }
    return result[0][0], result2[0][0];
  } catch (err) {
    throw new Error(`[ERR] getbookingID: ${err}`);
  }
};
exports.Deletebooking = async bookingId => {
  let bookingDetailId = await db.query(
    "select bookingDetailid from booking_head where bookingId = ?",
    [bookingId]
  );
  await db.query("delete from booking_detail where bookingId_detail = ?", [
    bookingDetailId
  ]);
};

exports.getPriceByBookingId = async bookingId =>{
  try {
    let searchPrice = await db.query(
      "select fullprice from booking_detail join booking_head on bookingId_detail = bookingDetailid where bookingId = ?",[bookingId]
    );
    console.log(searchPrice[0][0].fullprice);
    if(searchPrice[0]<1){
      throw new Error(`Undefinded get fullprice by booking id ${bookingId}`)
    }
    return searchPrice[0][0].fullprice;
  } catch (err){
    throw new Error(`Error get price by bookingId ${err}`);
  }
}

exports.updatePaid = async bookingId => {
  try {
    let query = await db.query('update booking_head set isPaid = true where bookingId = ?', [bookingId]);
    if(query[0] < 1){
      throw new Error(`Undefinded bookingId ${bookingId}`);
    }
    return query;
  } catch (err) {
    throw new Error(`Error updatePaid ${err}`);
  }
}