const db = require("../db/db");

exports.findAll = async () => {
  try {
    const airlineData = await db.query("SELECT * FROM airline");
    const airlines = await airlineData[0];
    return airlines;
  } catch (err) {
    throw new Error(`[ERR] Airline.findAll: ${err}`);
  }
};
