const db = require("../db/db");

exports.countUsers = async () => {
    try {
      const count = await db.query(`select count(user_id) as countID from user`);
  
      return count[0];

    } catch (err) {
    throw new Error(`[ERR] countUsers: ${err}`);
    }
  };

  exports.countHotel = async () => {
    try {
      const countPlace = await db.query(`select count(hotelId) as countID from hotel `);
  
      return countPlace[0];

    } catch (err) {
    throw new Error(`[ERR] countUsers: ${err}`);
    }
  };
  exports.countAirline = async () => {
    try {
      const countPlace = await db.query(`select count(airline_Id) as countID from airline `);
  
      return countPlace[0];

    } catch (err) {
    throw new Error(`[ERR] countAirline: ${err}`);
    }
  };

  exports.countPlace = async () => {
    try {
      const countPlace = await db.query(`select count(departure) as countID from Flight`);
  
      return countPlace[0];

    } catch (err) {
    throw new Error(`[ERR] countPlace: ${err}`);
    }
  };
  exports.countFlight = async () => {
    try {
      const countFlight = await db.query(`select count(Flight_number) as countID from Flight `);
  
      return countFlight[0];

    } catch (err) {
    throw new Error(`[ERR] countFlight: ${err}`);
    }
  };

  exports.getAllFlight = async () => {
    try {
      const AllFlight = await db.query(`select * from Flight as f,airline as a where f.Airline_ID = a.airline_Id`);
  
      return AllFlight[0];

    } catch (err) {
    throw new Error(`[ERR] countPlace: ${err}`);
    }
  };

  exports.getDiscountRoom = async () => {
    try {
      const DiscountRoom  = await db.query(`select * from room_detail where fullPrice > 1500 order by Saleprice asc`);
  
      return DiscountRoom [0];

    } catch (err) {
    throw new Error(`[ERR] countPlace: ${err}`);
    }
  };
 
  exports.getAllAirline = async () => {
    try {
      const allAirline = await db.query(`select * from airline`);
  
      return allAirline[0];

    } catch (err) {
    throw new Error(`[ERR] getAllAirline: ${err}`);
    }
  };
  
  
  exports.getMostFlightBooking = async () => {
    try {
      const allMost = await db.query(`select count(f.Flight_Number) as countID,f.flight_Number,p.airlineName from Flight_booking_detail as f ,Flight as a,airline as p where f.Flight_Number = a.Flight_Number 
      and a.airline_ID = p.airline_Id  group by f.flight_Number;`);
  
      return allMost[0];

    } catch (err) {
    throw new Error(`[ERR] getMostFlightBooking: ${err}`);
    }
  };
  