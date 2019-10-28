exports.isAuthenticated = (req, res, next) => {
    return req.isAuthenticated() ? next() : res.redirect("/login");
};

exports.isAdmin = (req, res, next) => {
    return req.isAuthenticated() ? next() : res.redirect("/login");
    //TODO: Handle logic to check if the user has admin privileges
};