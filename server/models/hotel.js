const db = require("../db/db");

exports.findHotelByPlace = async (place) => {
    try {
        console.log("trying");
        const result = await db.query("SELECT * FROM hotel WHERE hotelName LIKE '%"+place+"%' OR hotelAddress LIKE '%"+place+"%'");
        if (result[0].length < 1) {
            console.log("Brak wyników");
            throw new Error(`Cannot find hotel in ${place}.`);
        }

        return callback(results[0]);
    } catch (err) {
        throw new Error(`[ERR] findHotelByPlace: ${err}`);
    }
};