const db = require("../../db/db");

//hotel
exports.retrieveBookingDetail = async() =>{
    try{
        const result = await db.query(`SELECT * FROM development.booking_detail`);
        
        return result[0];
    } catch (err) {
        throw new Error(`[ERR] retrieveBookingDetail ${err}`);
    }
};

exports.retrieveBookingHead = async() => {
    try{
        const result = await db.query(`SELECT * FROM development.booking_head`);

        return result[0];
    } catch (err) {
        throw new Error(`[ERR] retrieveBookingHead ${err}`);
    }
}