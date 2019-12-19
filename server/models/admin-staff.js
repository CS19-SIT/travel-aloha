const db = require("../db/db");

exports.no = async function no(){
  try {
    const result = await db.query("SELECT * FROM user");
    // console.log(result);
    return result[0][0];
  } catch (err) {
    console.log(err);
    throw new Error(`REEE`);
  }
};
