const db = require("../db/db");

exports.findHotelByPlace = async place => {
    try {
        const result = await db.query("SELECT * FROM hotel WHERE place IS LIKE = ?", [
            place
        ]);

        if (result[0].length > 1) {
            throw new Error(`Cannot find hotel in ${place}.`);
        } else {
            console.log(result);
        }

        return result[0][0];
    } catch (err) {
        throw new Error(`[ERR] findHotelByPlace: ${err}`);
    }
};