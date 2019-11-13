const db = require("../db/db");
exports.getAllHotel = async () => {
    try {
        const result = await db.query(`SELECT * FROM hotel`);

        return result[0];
    } catch (err) {
        throw new Error(`[ERR] getAllHotel: ${err}`);
    }
};

exports.insertNewHotel = async (data) => {
    try {
        // console.log("From mode",data);
        await db.query("INSERT INTO hotel (hotelId,hotelName,hotelDescription,hotelAddress,hotelTelNumber,hotelContactNumber,hotelEmail,hotelPicture,hotelLogo), VALUES(hotelId = ? ,hotelName = ?,hotelDescription = ?,hotelAddress = ?,hotelTelNumber = ?,hotelContactNumber = ?,hotelEmail = ?,hotelPicture = ?,hotelLogo = ?)", [
            data.hotelId,
            data.hotelName,
            data.hotelDescription,
            data.hotelAddress,
            data.hotelTelNumber,
            data.hotelContactNumber,
            data.hotelEmail,
            data.hotelPicture,
            data.hotelLogo
        ]);
    } catch (err) {
        throw new Error(`[ERR] insertNewHotel: ${err}`);
    }
}