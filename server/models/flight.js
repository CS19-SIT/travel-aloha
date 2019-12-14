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

exports.findById = async flightId => {
  try {
    const flightsData = await db.query(
      "SELECT * FROM Flight WHERE Flight_number = ?",
      [flightId]
    );
    const flights = await flightsData[0][0];
    return flights;
  } catch (err) {
    throw new Error(`[ERR] Flight.findById: ${err}`);
  }
};

exports.create = async (
  flightNumber,
  departure,
  destination,
  airline,
  departDate,
  departTime,
  arriveDate,
  arriveTime
) => {
  try {
    const newFlight = await db.query(
      "INSERT INTO Flight VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        flightNumber,
        departDate,
        departTime,
        arriveDate,
        arriveTime,
        departure,
        destination,
        null,
        airline
      ]
    );
    if (newFlight.affectedRows < 1) throw new Error("Database has problem!");
  } catch (err) {
    throw new Error(`[ERR] Flight.create: ${err}`);
  }
};

exports.updateById = async (
  flightId,
  departure,
  destination,
  airline,
  departDate,
  departTime,
  arriveDate,
  arriveTime
) => {
  try {
    const updatedFlight = await db.query(
      "UPDATE Flight SET Depart_Date = ?, Depart_Time = ?, Arrive_Date = ?, Arrive_Time = ?, Departure = ?, Destination = ?, Airline_ID = ? WHERE Flight_number = ?",
      [
        departDate,
        departTime,
        arriveDate,
        arriveTime,
        departure,
        destination,
        airline,
        flightId
      ]
    );
    if (updatedFlight.affectedRows < 1)
      throw new Error("Database has problem!");
  } catch (err) {
    throw new Error(`[ERR] Flight.updateById: ${err}`);
  }
};

exports.deleteById = async flightId => {
  try {
    const deletedFlight = await db.query(
      "DELETE FROM Flight WHERE Flight_number = ?",
      [flightId]
    );
    if (deletedFlight.affectedRows < 1)
      throw new Error("Database has problem!");
  } catch (err) {
    throw new Error(`[ERR] Flight.deleteById: ${err}`);
  }
};
