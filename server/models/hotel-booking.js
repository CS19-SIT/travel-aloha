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
    // console.log(book_detail[0].insertId);
    console.log("Queried insert book detail");
    let book_head = await db.query(
      "insert into booking_head(checkinDate,checkoutDate,bookingDetailid) values (?,?,?)",
      [checkInDate, checkOutDate, book_detail[0].insertId]
    );
    // console.log(book_head);
    console.log("Queried insert book head");
    console.log("queried success, returning book_head_id")
    return book_head[0].insertId;
  } catch (error) {
    throw new Error(`[ERR] insertBooking: ${error}`);
  }
};
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

// Probably needed in model
// still no idea again ...
// room is reserved or free
// lock room after reserve
