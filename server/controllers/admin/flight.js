const moment = require("moment");

const Airport = require("../../models/airport");
const Airline = require("../../models/airline")
const Flight = require("../../models/flight");

exports.getIndex = async (req, res) => {
  const flightsData = await Flight.findAllFlightData();
  res.render("admin/admin-flight", {
    pageTitle: "Travel Aloha - Admin - Flight Management",
    user: req.user,
    flights: flightsData.map(flight => ({
      ...flight,
      Arrive_Date: moment(flight.Arrive_Date).format("D MMMM YYYY"),
      Depart_Date: moment(flight.Depart_Date).format("D MMMM YYYY")
    }))
  });
};

exports.getNew = async (req, res) => {
  const airports = await Airport.findAll();
  const airlines = await Airline.findAll();

  res.render("admin/edit-flight", {
    pageTitle: "Travel Aloha - Admin - Flight Management - Add New Flight",
    user: req.user,
    airports,
    airlines,
    flightData: undefined
  });
};

exports.getEdit = async (req, res) => {
  const { flightId } = req.params;
  const airports = await Airport.findAll();
  const airlines = await Airline.findAll();
  const flightData = await Flight.findById(flightId);

  res.render("admin/edit-flight", {
    pageTitle:
      "Travel Aloha - Admin - Flight Management - Edit Flight " + flightId,
    user: req.user,
    airports,
    airlines,
    flightData
  });
};

exports.postIndex = async (req, res) => {};

exports.putIndex = async (req, res) => {};

exports.deleteIndex = async (req, res) => {};
