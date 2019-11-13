const db = require("../db/db");
exports.getAllHotel = async () => {
    try {
        const result = await db.query(`SELECT * FROM hotel`);

        return result[0];
    } catch (err) {
        throw new Error(`[ERR] getAllHotel: ${err}`);
    }
};
exports.insertNewHotel = async (newHotelInfo) => {
    const { hotelId, hotelName, hotelDescription, hotelAddress,
        hotelTelNumber, hotelContactNumber, hotelEmail, hotelPicture, hotelLogo } = newHotelInfo;
    try {
        await db.query("Insert into hotel(hotelId,hotelName,hotelDescription,hotelAddress" +
            "hotelTelNumber,hotelContactNumber,hotelEmail,hotelPicture,hotelLogo) " +
            "values(`?`,`?`,`?`,`?`,?`,`?`,`?`,`?`,`?`)", [
            hotelId, hotelName, hotelDescription, hotelAddress, hotelTelNumber,
            hotelContactNumber, hotelEmail, hotelPicture, hotelLogo
        ]);

    } catch (error) {
        throw new Error(`[ERR] insertNewHotel: ${err}`);
    }
}
exports.insertNewAirline = async (newAirlineInfo) => {
    const { airline_Id, airlineName, airlineNationality, airlineEmail, airlineDescription,
        airlineAddress, airlineTelNumber, airlineContactNumber, airlinePicture, airlineLogo } = newAirlineInfo;
    try {
        await db.query("Insert into hotel(airline_Id, airlineName, airlineNationality, airlineEmail" +
            "airlineDescription,airlineAddress, airlineTelNumber, airlineContactNumber, airlinePicture, airlineLogo) " +
            "values(`?`,`?`,`?`,`?`,?`,`?`,`?`,`?`,`?`,`?`)", [
            airline_Id, airlineName, airlineNationality, airlineEmail, airlineDescription,
            airlineAddress, airlineTelNumber, airlineContactNumber, airlinePicture, airlineLogo
        ]);

    } catch (error) {
        throw new Error(`[ERR] insertNewHotel: ${err}`);
    }
}