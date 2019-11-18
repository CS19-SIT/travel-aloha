exports.getIndex = (req, res) => res.render("admin/admin-flight", {
    pageTitle: "Travel Aloha - Admin - Flight Management",
    user: req.user
});