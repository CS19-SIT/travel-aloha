const db = require("../db/db");

exports.getAllUser = async() =>{
  try{
      const result = await db.query(`SELECT * FROM user`);
      
      return result[0];
  } catch (err) {
      throw new Error(`[ERR] getAlluser: ${err}`);
  }
};

exports.modelUpdateUser = async(data)=>{
    try {
        await db.query("UPDATE user set username = ? , gender = ?, firstname = ?, lastname = ?, email = ? WHERE user_id = ?",[
            data.username,
            data.gender,
            data.firstname,
            data.lastname,
            data.email,
            data.user_id
        ]);
    } catch (err) {
        throw new Error(`[ERR] modelUpdateUser: ${err}`);
    }
}

exports.findUserById = async user_id => {
    try {
      const result = await db.query("SELECT * FROM user WHERE user_id = ?", [
        user_id
      ]);
  
    //   if (result[0].length < 1) {
    //     throw new Error(`Cannot find user with id ${user_id}.`);
    //   }
  
      return result[0][0];
    } catch (err) {
      throw new Error(`[ERR] findUserById: ${err}`);
    }
  };