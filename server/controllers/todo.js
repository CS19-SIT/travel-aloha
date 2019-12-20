exports.getIndex = (req, res) =>
  res.render("todo", { pageTitle: "Travel Aloha - Example", user: req.user });