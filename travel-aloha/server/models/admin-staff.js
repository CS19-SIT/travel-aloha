const db = require("../db/db");
const EventEmitter = require('events');
const event = new EventEmitter();

event.on("NO", (args) => {
    console.log(args);
})

event.emit("NO", {data: 'hello', id: 123});

exports.no = async function no(){
  try {
    const result = await db.query("SELECT * FROM user");
    console.log(result);
    return result[0][0];
  } catch (err) {
    console.log(err);
    throw new Error(`REEE`);
  }
};
