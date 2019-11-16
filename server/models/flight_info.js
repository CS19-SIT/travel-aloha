const db = require("../db/db");

exports.getFlightInfoByNumber = async flight_number =>{  
    try {
        const result = await db.query("SELECT * FROM Flight WHERE flight_number = ?", [
        flight_number
    ]);

    if (result[0].length < 1) {
        throw new Error(`Cannot find flight with id ${flight_number}.`);
    }

    return result[0][0];
    } catch (err) {
        throw new Error(`[ERR] findFlight: ${err}`);
    }
};

exports.getAllTransit = async flight_number =>{
    try{
        var transit = [];
        do{
            const result = await db.query("SELECT * FROM Flight WHERE flight_number = ?", [
                flight_number]);
            transit.push(result[0][0]);
            flight_number = result[0][0]['transit'];
        }while(flight_number !== null);
    }
    catch(err){
        throw new Error(`[ERR] findTransit: ${err}`);
    }
};