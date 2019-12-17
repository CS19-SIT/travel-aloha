const moment = require("moment");

const Airport = require("../../models/airport");
const Airline = require("../../models/airline");
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

exports.postIndex = async (req, res) => {
  const {
    flightNumber,
    departure,
    destination,
    airline,
  } = req.body;

  for (key in req.body) if (!req.body[key]) return res.sendStatus(400);

  try {
    await Flight.create(
      flightNumber,
      departure,
      destination,
      airline,
    );
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.putIndex = async (req, res) => {
  const { flightId } = req.params;
  const {
    departure,
    destination,
    airline,
  } = req.body;

  if (!flightId) return res.sendStatus(400);
  for (key in req.body) if (!req.body[key]) return res.sendStatus(400);

  try {
    await Flight.updateById(
      flightId,
      departure,
      destination,
      airline,
    );
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.deleteIndex = async (req, res) => {
  const { flightId } = req.params;
  if (!flightId) return res.sendStatus(400);
  
  try {
    await Flight.deleteById(flightId);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};
