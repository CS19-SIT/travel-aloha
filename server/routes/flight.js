const express = require("express");
const app = express();

exports.getRegister = (req, res) =>
  res.render("auth/register", {
    pageTitle: "TravelAloha - Register",
    user: req.user
  });