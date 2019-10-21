require("dotenv").config();

const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findUserByUsername(username);
      if (!user) throw new Error(`Cannot find user with username ${username}.`);

      const isSamePassword = await bcrypt.compare(password, user.password);

      if (!isSamePassword) throw new Error(`Password does not match.`);

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

module.exports = passport;
