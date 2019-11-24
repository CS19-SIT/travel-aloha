const db = require("../db/db");

exports.findAll = async () => {
  try {
    const flightsData = await db.query("SELECT * FROM Flight");
    const flights = await flightsData[0];
    return flights;
  } catch (err) {
    throw new Error(`[ERR] Flight.findAll: ${err}`);
  }
};

exports.findAllFlightData = async () => {
  try {
    const flightsData = await db.query(
      "SELECT Flight.Flight_number, Depart_Date, Depart_Time, Arrive_Date, Arrive_Time, Departure, DepartureAirport.Airport_name AS DepartureAirport, Destination, DestinationAirport.Airport_name AS DestinationAirport, airlineName" +
        " FROM Flight JOIN airline ON airline.airline_Id = Flight.Airline_ID, (SELECT Flight_number, Airport_name FROM Airport JOIN Flight ON Destination = Airport_ID) AS DestinationAirport," +
        " (SELECT Flight_number, Airport_name FROM Airport JOIN Flight ON Departure = Airport_ID) AS DepartureAirport" +
        " WHERE DestinationAirport.Flight_number = Flight.Flight_number AND DepartureAirport.Flight_number = Flight.Flight_number"
    );
    const flights = await flightsData[0];
    return flights;
  } catch (err) {
    throw new Error(`[ERR] Flight.findAllFlightData: ${err}`);
  }
};
