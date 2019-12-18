const uuid = require("uuid/v4");
const bcrypt = require("bcrypt");

const passport = require("../../auth/passport");
const User = require("../../models/user");
const Customer = require("../../models/customer");

exports.getRegister = (req, res) =>
  res.render("auth/register", {
    pageTitle: "TravelAloha - Register",
    user: req.user
  });

exports.postRegister = async (req, res, next) => {
  const {
    username,
    password,
    retypePassword,
    firstname,
    lastname,
    birth_date,
    gender,
    address
  } = req.body;
  try {
    if (
      !username ||
      !password ||
      !retypePassword ||
      !firstname ||
      !lastname ||
      !birth_date ||
      !gender ||
      !address
    )
      next(new Error("Field must not be empty!"));
    let existedUsername;
    try {
      existedUsername = await User.findUserByUsername(username);
    } catch (err) {}
    if (existedUsername) next(new Error("Username already existed."));
    if (password !== retypePassword)
      next(new Error("Password does not match."));

    const userId = uuid();
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.createUser({
      user_id: userId,
      username,
      password: hashedPassword,
      gender,
      birth_date,
      firstname,
      lastname,
      address,
      email: undefined
    });

    await Customer.createCustomer({
      user_id: userId,
      total_spend: 0
    });
    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

exports.getLogin = (req, res) =>
  res.render("auth/login", {
    pageTitle: "TravelAloha - Login",
    user: req.user
  });

exports.postLogin = passport.authenticate("local", {
  successReturnToOrRedirect: "/",
  failureRedirect: "/login"
});

exports.postLogout = (req, res) => {
  req.session.destroy(err => {
    res.redirect("/");
  });
};
