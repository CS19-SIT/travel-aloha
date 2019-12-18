const db = require("../db/db");
exports.updateProfile = async ({
    firstname,
    lastname,
    username,
    birth_date,
    profilepicture,
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
            profile_picture = ?,
            gender = ?,
            Email = ?,
            address = ?
        WHERE user_id = ?
        `, [
            firstname,
            lastname,
            username,
            birth_date,
            profilepicture,
            gender,
            Email,
            address,
            user_id
        ]);
    } catch (error) {
        throw new Error(`[ERR] updateProfile: ${error}`);
    }
};
// multer.upload(req, res, async err => {
//     const {
//       hotelName,
//       hotelEmail,
//       hotelAddress,
//       hotelTelNumber,
//       hotelContactNumber,
//       hotelDescription,
//       hotelRoomType,
//       hotelRoomType2,
//       hotelRoomType3,
//       hotelRoomType4,
//       hotelRoomType5,
//       hotelRoomType6,
//       hotelRoomPrice,
//       hotelRoomPrice2,
//       hotelRoomPrice3,
//       hotelRoomPrice4,
//       hotelRoomPrice5,
//       hotelRoomPrice6
//     } = req.body;
//     console.log(hotelRoomType2);
//     if (err) {
//       res.sendStatus(400);
//       return;
//     }
//     const hotelProfile = req.files["hotelProfile"][0].filename;
//     const hotelPicture = req.files["hotelPicture"][0].filename;