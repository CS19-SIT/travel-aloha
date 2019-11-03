const db = require("../db/db");


// console.log("HI");

exports.no = async function no(){
  try {
    const hahayes = await db.query("SELECT * FROM user");
    console.log(hahayes);
    // return result[0][0];
  } catch (err) {
    console.log(err);
    throw new Error(`REEE`);
  }
};

// console.log(no());

console.log({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_SECRET,
    database : process.env.MYSQL_DB
})

// async function test(){
//     try{
//         const no = await db.query('SELECT * FROM user');
//         return no;
//     }
//     catch (err){ 
//         console.log(err);
//     }
    
// }

// console.log(test());


// console.log(hahayes);

// exports.test = test;
