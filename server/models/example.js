const db = require("../db/db");

exports.getAllCountry = async () => {
    try {
        let allCountry = await db.query("SELECT NAMEINENGLISH FROM country;");
        // console.log(allCountry[0][0].NAMEINENGLISH);
        return allCountry[0];        
    } catch (err) {
        throw new Error(`[ERR] getAllHotel: ${err}`);
    }
}