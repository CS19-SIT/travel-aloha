const db = require("../db/db");

exports.searchHotelFormOptions = async (query, page, entriesPerPage = 20) => {
  try {
    return db.query(`
      SELECT hotelId AS id, hotelName AS text
      FROM hotel
      WHERE UPPER(hotelName) LIKE UPPER(?)
      ORDER BY text ASC
      LIMIT ?, ?
    `,
    [
      `%${query}%`,
      page * entriesPerPage,
      entriesPerPage
    ]).then(r => {
      return {
        results: r[0],
        pagination: {
          more: r[0].length >= entriesPerPage
        }
      }
    });
  } catch (err) {
    throw new Error(`[ERR] searchHotelFormOptions: ${err}`)
  }
};

exports.searchAirlineFormOptions = async (query, page, entriesPerPage = 20) => {
  try {
    return db.query(`
      SELECT airline_Id AS id, airlineName AS text
      FROM airline
      WHERE UPPER(airlineName) LIKE UPPER(?)
      ORDER BY text ASC
      LIMIT ?, ?
    `,
    [
      `%${query}%`,
      page * entriesPerPage,
      entriesPerPage
    ]).then(r => {
      return {
        results: r[0],
        pagination: {
          more: r[0].length >= entriesPerPage
        }
      }
    });
  } catch (err) {
    throw new Error(`[ERR] searchAirlineFormOptions: ${err}`)
  }
};

exports.searchUser = async (query, page, entriesPerPage = 20) => {
  try {
    return db.query(`
      SELECT user_id AS id, username AS text
      FROM user
      WHERE UPPER(username) LIKE UPPER(?)
      ORDER BY text ASC
      LIMIT ?, ?
    `,
    [
      `%${query}%`,
      page * entriesPerPage,
      entriesPerPage
    ]).then(r => {
      return {
        results: r[0],
        pagination: {
          more: r[0].length >= entriesPerPage
        }
      }
    });
  } catch (err) {
    throw new Error(`[ERR] searchUser: ${err}`)
  }
}
