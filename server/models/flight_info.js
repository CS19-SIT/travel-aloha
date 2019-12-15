const db = require("../db/db");

exports.search = async () => {
    const { origin ,destination, check_in, check_out} = req.body;
    try{
        if (!origin | !destination | !check_in){
            throw new Error();
        }
        const result = await db.query("select f.Destination, f.Depart_Date, a.airlineName, s.class, air.Airport_name " + 
        " from Flight as f, airline as a, Seat as s, Airport as air where Departure = '"
        + origin +"' and Destination = '" + destination + "' and Depart_Date = '" + check_in + "';");

        if(result[0].length < 1){
            throw new Error(`[ERR] Flight.search: ${err}`);
        }

        return result[0];
        
    } catch(err){
        console.log(err);
        console.log(origin + " " + destination + " " + check_in);
        res.redirect("/flights");
    }
};

exports.getData = async () => {
    try{
        const getData = await db.query("select * from Flight, airline, Airport, Seat;");
        return getData[0];
    }
    catch(err){
        throw new Error(`[ERR] getData: ${err}`);
    }
    
};

