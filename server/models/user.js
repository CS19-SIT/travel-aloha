const db = require("../db/db");

exports.findUserById = async user_id => {
  try {
    const result = await db.query("SELECT * FROM user WHERE user_id = ?", [
      user_id
    ]);

    if (result[0].length < 1) {
      throw new Error(`Cannot find user with id ${user_id}.`);
    }

    return result[0][0];
  } catch (err) {
    throw new Error(`[ERR] findUserById: ${err}`);
  }
};

exports.getAllCountry = async () => {
    try {
        let allCountry = await db.query("SELECT NAMEINENGLISH FROM country;");
        // console.log(allCountry[0][0].NAMEINENGLISH);
        return allCountry[0];        
    } catch (err) {
        throw new Error(`[ERR] getAllHotel: ${err}`);
    }
} ;

exports.findUserByUsername = async username => {
  try {
    const result = await db.query("SELECT * FROM user WHERE username = ?", [
      username
    ]);
    if (result[0].length < 1) {
      throw new Error(`Cannot find user with username ${username}.`);
    }

    return result[0][0];
  } catch (err) {
    throw new Error(`[ERR] findUserByUsername: ${err}`);
  }
};

exports.createUser = async ({
  user_id,
  username,
  password,
  gender,
  birth_date,
  profile_picture,
  firstname,
  lastname,
  address,
  email
}) => {
  try {
    await db.query("INSERT INTO user(user_id, username, password, gender, birth_date, profile_picture, firstname, lastname, address, Level, Email) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
      user_id,
      username,
      password,
      gender,
      birth_date,
      profile_picture,
      firstname,
      lastname,
      address,
      0,
      email
    ]);
  } catch (err) {
    throw new Error(`[ERR] createUser: ${err}`);
  }
};
