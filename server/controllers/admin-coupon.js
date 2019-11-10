exports.getIndex = (req, res) => res.render("admin/admin-coupon", {
    pageTitle: "Travel Aloha - Admin - Coupon Management",
    user: req.user
});