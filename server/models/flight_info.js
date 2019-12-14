const db = require("../db/db");

exports.getFlightInfoByNumber = async flight_number =>{  
    try {
        const result = await db.query("SELECT Flight_number, DATE_FORMAT(Depart_Date, '%d-%b-%Y') AS Dep_Date, TIME_FORMAT(Depart_Time, '%H:%i') AS Dep_time, DATE_FORMAT(Arrive_Date, '%d-%b-%Y') AS Arr_Date, TIME_FORMAT(Arrive_Time, '%H:%i') AS Arr_time, "+
                                        "Departure, Destination, dep.city AS dep_city, des.city AS des_city, DATE_FORMAT(Depart_Date, '%W') AS Dep_Day, airlineLogo as airline_logo, airlineName "
                                        +
                                        "FROM Flight, Airport AS dep, Airport AS des, airline "+
                                        "WHERE flight_number = ? AND Departure=dep.Airport_ID AND Destination=des.Airport_ID AND Flight.Airline_ID = airline.airline_Id", [
            flight_number
        ]);

        const result1 = await db.query("SELECT * FROM Flight");

        console.log(result1[0]);

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

xports.search = async (req,res) => {
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

exports.getData = async (req,res) => {
    try{
        result = await db.query("select Destination, Depart_Date, Arrive_Date from Flight;");
        return result[0];
    }
    catch(err){
        console.log(err);
        res.redirect("/flights");
    }
    
};

