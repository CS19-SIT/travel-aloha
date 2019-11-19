exports.getDashboard = (req, res) => {
    // const userId = req.params.id;
    res.render("userDashboard", {
        pageTitle: "Dashboard user",
        user: req.user,
    });
};

exports.getEditProfile = (req, res) => {

    res.render("editProfile.ejs", {
        user:req.user,
        pageTitle: "edit profile"
    });
};



