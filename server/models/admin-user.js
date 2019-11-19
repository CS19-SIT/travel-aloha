const db = require("../db/db");

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