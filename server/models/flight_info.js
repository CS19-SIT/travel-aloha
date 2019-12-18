const db = require("../db/db");

exports.search = async (origin, destination, check_in) => {

    try{
        const result = await db.query("select * " + 
        "from development.Flight as f, development.airline as a, development.Airport as air, development.Daily_Flight as df, development.Seat_Price as se "
        + "where f.Destination = '" + "CNX" +"' and f.Departure = '" + "BKK" + 
        "' and se.Class like 'E%' and df.Depart_Date = '" + "2019-11-14'" + 
        " and df.Flight_Number = f.Flight_Number and se.Flight_Number = f.Flight_Number and air.Airport_ID = 'BKK' " +
        "and air.City = 'Chiang Mai'" +
        " order by se.Price ASC;",
        [origin,destination,check_in]);

        return result[0];
        
    } catch(err){
        throw new Error(`[ERR] search: ${err}`);
    }
};

exports.getData = async () => {
    try{
        const getData = await db.query("SELECT * FROM Flight, airline, Airport, Daily_Flight, Seat_Price LIMIT 10;");
        return getData[0];
    }
    catch(err){
        throw new Error(`[ERR] getData: ${err}`);
    }
    
};

exports.getFlightInfoByNumber = async flight_number =>{  
    try {
        const result = await db.query("SELECT Flight_number, "+
                                        "Departure, Destination, dep.city AS dep_city, des.city AS des_city, airlineLogo as airline_logo, airlineName "
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
