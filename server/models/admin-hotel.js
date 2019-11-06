const db = require("../db/db");

exports.getAllHotel = async() =>{
    try{
        const result = await db.query(`SELECT * FROM hotel`);
        
        return result[0];
    } catch (err) {
        throw new Error(`[ERR] getAllHotel: ${err}`);
    }
};

exports.modelUpdateHotel = async(data)=>{
    try {
        // console.log("From mode",data);
        await db.query("UPDATE hotel set hotelAddress = ? , hotelTelNumber = ?, hotelEmail = ? WHERE hotelId = ?",[
            data.hotelAddress,
            data.hotelTelNumber,
            data.hotelEmail,
            data.hotelId
        ]);
    } catch (err) {
        throw new Error(`[ERR] modelUpdateHotel: ${err}`);
    }
}