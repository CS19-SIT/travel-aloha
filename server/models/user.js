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
