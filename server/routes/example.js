const express = require("express");
const router = express.Router();

const exampleControll = require("../controllers/example");

router.get('/country',exampleControll.getAll);

module.exports = router;