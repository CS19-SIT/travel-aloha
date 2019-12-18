const db = require("../db/db");
exports.updateProfile = async ({
    firstname,
    lastname,
    username,
    birth_date,
    gender,
    Email,
    address,
    user_id
}) => {

    try {
        await db.query(`
        UPDATE user
        SET
            firstname = ?,
            lastname = ?,
            username = ?,
            birth_date = ?,
            gender = ?,
            Email = ?,
            address = ?
        WHERE user_id = ?
        `, [
            firstname,
            lastname,
            username,
            birth_date,
            gender,
            Email,
            address,
            user_id
        ]);
    } catch (error) {
        throw new Error(`[ERR] insertNewHotel: ${error}`);
    }
};