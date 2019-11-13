exports.getDashboard = (req, res) => {
    // const userId = req.params.id;
    res.render("userDashboard", {
        pageTitle: "Dashboard user",
        user: req.user,
    });
};

exports.getEditProfile = (req, res) => {

    res.render("editProfile.ejs", {
        user: {
            username: "Firstname Lastname"
        },
        pageTitle: "edit profile"
    });
};

// exports.getUserId = (req, res) => {
//     const userId = req.params.id;
//     res.send(`<h1>UserId : ${userId}</h1>`)
// };

