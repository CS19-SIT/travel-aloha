const db = require("../db/db");

exports.getFlightInfoByNumber = async (flight_number,seatClass) =>{  
    // console.log(flight_number[0][1]);
    try {
        statment = "SELECT df.Flight_number, DATE_FORMAT(Depart_Date, '%d-%b-%Y') AS Dep_Date, TIME_FORMAT(Depart_Time, '%H:%i') AS Dep_time, DATE_FORMAT(Arrive_Date, '%d-%b-%Y') AS Arr_Date, TIME_FORMAT(Arrive_Time, '%H:%i') AS Arr_time, "+
        "Departure, Destination, dep.city AS dep_city, des.city AS des_city, DATE_FORMAT(Depart_Date, '%W') AS Dep_Day, airlineLogo as airline_logo, airlineName, TIME_FORMAT(TIMEDIFF(Arrive_Time, Depart_Time), '%H h %i min') AS timespan, price, DATE_FORMAT(Depart_Date, '%Y-%m-%d') AS nor_Depart_Date "
        +
        "FROM Daily_Flight AS df, Flight, Airport AS dep, Airport AS des, airline, Seat_Price AS sp "+
        "WHERE (Flight.flight_number = '"+flight_number[0][0]+"' AND df.flight_number = Flight.flight_number AND Departure=dep.Airport_ID AND Destination=des.Airport_ID AND Flight.Airline_ID = airline.airline_Id AND Flight.flight_number = sp.flight_number AND "+
        "Depart_Date = '"+flight_number[0][1]+"' AND sp.class = '"+seatClass+"')";
        for(i=1 ; i<flight_number.length ; i++)
        {
            statment+=" OR (Flight.flight_number = '"+flight_number[i][0]+"' AND df.flight_number = Flight.flight_number AND Departure=dep.Airport_ID AND Destination=des.Airport_ID AND Flight.Airline_ID = airline.airline_Id AND Flight.flight_number = sp.flight_number AND "+
            "Depart_Date = '"+flight_number[i][1]+"' AND sp.class = '"+seatClass+"')";
        }
        statment += " ORDER BY Dep_Date";
        const result = await db.query(statment);
        // const result = await db.query("SELECT df.Flight_number, DATE_FORMAT(Depart_Date, '%d-%b-%Y') AS Dep_Date, TIME_FORMAT(Depart_Time, '%H:%i') AS Dep_time, DATE_FORMAT(Arrive_Date, '%d-%b-%Y') AS Arr_Date, TIME_FORMAT(Arrive_Time, '%H:%i') AS Arr_time, "+
        //                                 "Departure, Destination, dep.city AS dep_city, des.city AS des_city, DATE_FORMAT(Depart_Date, '%W') AS Dep_Day, airlineLogo as airline_logo, airlineName, TIME_FORMAT(TIMEDIFF(Arrive_Time, Depart_Time), '%H h %i min') AS timespan "+
        //                                 "FROM Daily_Flight AS df, Flight, Airport AS dep, Airport AS des, airline, Seat_Price "+
        //                                 "WHERE Flight.flight_number = ? AND df.flight_number=Flight.flight_number AND Departure=dep.Airport_ID AND Destination=des.Airport_ID AND Flight.Airline_ID = airline.airline_Id", [
        //     flight_number[0]
        // ]);
        // const result1 = await db.query("SELECT * FROM Flight WHERE flight_number = ?",[
        //     flight_number[0]
        // ]);

        // console.log(result1[0]);

        if (result[0].length < 1) {
            throw new Error(`Cannot find flight with id ${flight_number}.`);
        }

        return result[0];
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


exports.getSeatPrice = async (flight_number,seatClass) =>{
    try{
        const seatPrice = []; 
        seatPrice[0] = await db.query("SELECT price FROM Seat_Price WHERE flight_number = ? AND class = ?", [
            flight_number,
            seatClass]);
    }
    catch(err){
        throw new Error(`[ERR] findTransit: ${err}`);
    }
};

exports.getStringPrice = async (seatPrice) =>{
    let strPrice = [];
    for(i=0 ; i<seatPrice.length ; i++)
    {
        var j= Math.floor(seatPrice[i]);
        let output = "";
        while(j>999){
            if(j%1000==0){
                output = ","+ "000" + output;
            }else if(j%1000<=99){
                output = ",0"+ j%1000 + output;
            }else if(j%1000<=9){
                output = ",00"+ j%1000 + output;
            }
            else{
                output = ","+ j%1000 + output;
            }
            j = Math.floor(j/1000);
        }
        output = j+output;
        strPrice.push(output);
    }  
    return strPrice;
};

exports.getSum = async (seatPrice) =>{
    let sum=0;
    for(var i=0 ; i<seatPrice.length ; i++)
    {
        sum+=parseFloat(seatPrice[i]);
    }
    return sum;
};

exports.recordPassager = async (passager) => {
    try{
        for(var i=0 ; i<passager.length ; i++)
        {
            const result = await db.query("SELECT * FROM flight_booking_passenger WHERE firstname = ? AND lastname = ?",[
                passager[i]['fname'],
                passager[i]['lname']
            ]);
            if(result[0].length<1)
            {
                await db.query("INSERT INTO flight_booking_passenger (firstname, lastname, name_title, birth_date, cid, passport_ID) VALUES (?, ?, ?, ?, ?, ?)",[
                    passager[i]['fname'],
                    passager[i]['lname'],
                    passager[i]['nameTitle'],
                    passager[i]['birthDate'],
                    passager[i]['cid'],
                    passager[i]['passport']
                ]);
            }
            else
            {   
                if(result[0][0]['cid']==null && passager[i]['cid']!=null)
                {
                    await db.query("UPDATE flight_booking_passenger SET cid = ? WHERE firstname = ? AND lastname = ?",[
                        passager[i]['cid'],
                        passager[i]['fname'],
                        passager[i]['lname']
                    ]);
                }
                if(result[0][0]['passport']==null && passager[i]['passport']!=null)
                {
                    await db.query("UPDATE flight_booking_passenger SET passport_id = ? WHERE firstname = ? AND lastname = ?",[
                        passager[i]['passport'],
                        passager[i]['fname'],
                        passager[i]['lname']
                    ]);
                }
            }
        }
    }
    catch(err){
        throw new Error(`[ERR] In Record passager: ${err}`);
    }
}

exports.createSeat = async (flight_number,seatClass) => {
    for(var i=10 ; i<=60 ; i++)
    {
        await db.query("INSERT INTO Seat (seat_number, flight_number, depart_date, class) VALUES (?, ?, ?, ?)",[
            i+"B",
            flight_number[0][0],
            flight_number[0][1],
            seatClass
        ]);
        await db.query("INSERT INTO Seat (seat_number, flight_number, depart_date, class) VALUES (?, ?, ?, ?)",[
            i+"C",
            flight_number[0][0],
            flight_number[0][1],
            seatClass
        ]);
        await db.query("INSERT INTO Seat (seat_number, flight_number, depart_date, class) VALUES (?, ?, ?, ?)",[
            i+"H",
            flight_number[0][0],
            flight_number[0][1],
            seatClass
        ]);
        await db.query("INSERT INTO Seat (seat_number, flight_number, depart_date, class) VALUES (?, ?, ?, ?)",[
            i+"I",
            flight_number[0][0],
            flight_number[0][1],
            seatClass
        ]);
        await db.query("INSERT INTO Seat (seat_number, flight_number, depart_date, class) VALUES (?, ?, ?, ?)",[
            i+"J",
            flight_number[0][0],
            flight_number[0][1],
            seatClass
        ]);
    }
}

exports.getUpsell = async (flight_number) => {
    const result = await db.query(
        "SELECT product, price, product_detail "+
        "FROM Upsell "+
        "WHERE flight_number = ? ", 
        [
            flight_number
        ]
    );
    return result[0];
}

exports.getSeat = async (flight_number,date,seatClass) => {
    
    const result = await db.query(
        "SELECT Seat_Number, CASE Availability WHEN '0' THEN false WHEN '1' THEN true END AS Ava "+
        "FROM Seat "+
        "WHERE Flight_number = ? AND Depart_date = ? AND Class = ? ", 
        [
            flight_number,
            date,
            seatClass
        ]
    );
    seat = [];
    // console.log(result[0]);
    return result[0];
}

exports.recordBookingHead = async (contact,user_id,booking_ref) => {
    try{
        var today = new Date();
        await db.query("INSERT INTO flight_booking_head (Booking_ref, Customer_ID, Book_Date, cont_fname, cont_lname, cont_email,cont_phone ) VALUES (?, ?, ?, ?, ?, ?, ?)",[
            booking_ref,
            user_id,
            today,
            contact['fname'],
            contact['lname'],
            contact['email'],
            contact['phone']
        ]);
    }catch(err){
        throw new Error(`[ERR] In Record Booking Head: ${err}`);
    }
}

exports.recordBookingdetail = async (reserveSeat,booking_ref) => {
    try{
        for(var i=0 ; i<reserveSeat.length ; i++)
        {
            for(var j=0 ; j<reserveSeat[i].length ; j++)
            {
                await db.query("INSERT INTO Flight_booking_detail (Firstname, Lastname, Booking_ref, Flight_Number, Depart_date, Seat_Number) VALUES (?, ?, ?, ?, ?, ?)",[
                    reserveSeat[i][j]['fname'],
                    reserveSeat[i][j]['lname'],
                    booking_ref,
                    reserveSeat[i][j]['flight'],
                    reserveSeat[i][j]['dep_date'],
                    reserveSeat[i][j]['seat']
                ]);
                await db.query("UPDATE Seat SET Availability = ? WHERE Seat_Number = ? AND Flight_Number = ? AND Depart_date = ? ",[
                    false,
                    reserveSeat[i][j]['seat'],
                    reserveSeat[i][j]['flight'],
                    reserveSeat[i][j]['dep_date']
                ]);
            }
        }
        
    }catch(err){
        throw new Error(`[ERR] In Record Booking Detail: ${err}`);
    }
}

exports.recordBookingUpsell = async (upsell,upsellData,booking_ref,passagerinfo,flight_info) => {
    try{
        for(var i=0 ; i<upsellData.length ; i++)
        {
            var tmp = upsellData[i].split("_");
            var path = tmp[1].split("-");
            // console.log(path);
            await db.query("INSERT INTO Booking_Upsell (Firstname, Lastname, Booking_ref, Flight_Number, Depart_date, Product) VALUES (?, ?, ?, ?, ?, ?)",[
                passagerinfo[path[1]]['fname'],
                passagerinfo[path[1]]['lname'],
                booking_ref,
                flight_info[path[0]]['Flight_number'],
                flight_info[path[0]]['nor_Depart_Date'],
                upsell[path[0]][path[2]]['product']
            ]);
        }
        
    }catch(err){
        throw new Error(`[ERR] In Record Booking Up Sell: ${err}`);
    }
}