const db = require("../db/db");

exports.getAllHotel = async() =>{
    try{
        const result = await db.query(`SELECT * FROM hotel`);
        
        return result[0];
    } catch (err) {
        throw new Error(`[ERR] getAllHotel: ${err}`);
    }
};