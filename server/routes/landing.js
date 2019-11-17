const express = require("express");
const router = express.Router();

const landingController = require("../controllers/landing");

router.post("/find", landingController.find);

router.get("/hotel", (req, res) =>
    res.render("landingpage_hotel/landingpage", {
        pageTitle: "Find Hotel",
        user: req.user
    })
);

module.exports = router;
