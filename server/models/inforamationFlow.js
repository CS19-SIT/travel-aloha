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

exports.insertNewAirline = async (data) => {
    try{
        await db.query("INSERT INTO new_airline (airline_Id,airlineName,airlineNationality,airlineEmail,airlineDescription,airlineAddress,airlineTelNumber,airlineContactNumber,airlinePicture,airlineLogo), VALUES(airline_Id = ?,airlineName = ?,airlineNationality = ?,airlineEmail = ?,airlineDescription = ?,airlineAddress = ?,airlineTelNumber = ?,airlineContactNumber = ?,airlinePicture = ?,airlineLogo = ?)",
        [
            data.airline_Id,
            data.airlineName,
            data.airlineNationality,
            data.airlineEmail,
            data.airlineDescription,
            data.airlineAddress,
            data.airlineTelNumber,
            data.airlineContactNumber,
            data.airlinePicture,
            data.airlineLogo
        ]);
    } catch (err) {
        throw new Error(`[ERR] insertNewAirline: ${err}`);
    }
}