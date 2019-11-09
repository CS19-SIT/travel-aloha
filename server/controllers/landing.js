exports.find = (req, res) => res.render("index", {
    pageTitle: "TravelAloha results",
    user: req.user
});