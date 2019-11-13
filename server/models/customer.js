const db = require("../db/db");

exports.createCustomer = async ({
    user_id,
    total_spend
  }) => {
    try {
      await db.query("INSERT INTO customer VALUES(?, ?)", [
        user_id,
        total_spend
      ]);
    } catch (err) {
      throw new Error(`[ERR] createUser: ${err}`);
    }
  };