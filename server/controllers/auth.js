const passport = require("../auth/passport");

exports.getRegister = (req, res) => {};

exports.postRegister = (req, res) => {};

exports.getLogin = (req, res) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  });
};

exports.postLogin = (req, res) => {};
