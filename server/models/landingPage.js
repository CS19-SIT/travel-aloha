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

  exports.countPlace = async () => {
    try {
      const countPlace = await db.query(`select count(departure) as countID from Flight `);
  
      return countPlace[0];

    } catch (err) {
    throw new Error(`[ERR] countPlace: ${err}`);
    }
  };

  exports.getAllFlight = async () => {
    try {
      const countPlace = await db.query(`select * from Flight `);
  
      return countPlace[0];

    } catch (err) {
    throw new Error(`[ERR] countPlace: ${err}`);
    }
  };

 