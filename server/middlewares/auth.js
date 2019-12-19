exports.isAuthenticated = (req, res, next) => {
  return req.isAuthenticated() ? next() : res.redirect("/login");
};

exports.isStaff = (req, res, next) => {
  return req.isAuthenticated() ? next() : res.redirect("/login");
  //TODO: Handle logic to check if the user has staff privileges
};

exports.isAdmin = (req, res, next) => {
  return req.isAuthenticated() ? next() : res.redirect("/login");
  //TODO: Handle logic to check if the user has admin privileges
};