exports.getIndex = (req, res) => res.render("admin/admin-hotel", {
    pageTitle: "Travel Aloha - Admin - Hotel Management",
    user: req.user
});