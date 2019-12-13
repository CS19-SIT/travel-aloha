const db = require("../db/db");

exports.findAll = async () => {
  try {
    const airportData = await db.query("SELECT * FROM Airport");
    const airports = await airportData[0];
    return airports;
  } catch (err) {
    throw new Error(`[ERR] Airport.findAll: ${err}`);
  }
};
