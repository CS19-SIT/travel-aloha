exports.get404 = (req, res) => res.status(404).render("404", {
  pageTitle: "Travel Aloha - Page not found",
  user: req.user
});
