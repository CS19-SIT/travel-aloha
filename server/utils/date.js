const moment = require("moment");

moment.suppressDeprecationWarnings = true;

const getDate = () => {
  return moment().format("YYYY-MM-DD");
};

const formatDate = date => {
  return moment(date).format("YYYY-MM-DD");
};

const getDateObject = date => {
  return {
    day: moment(date).get("date"),
    month: moment(date).get("month"),
    year: moment(date).get("year")
  };
};
module.exports = {
  getDate,
  formatDate,
  getDateObject
};