const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todo");

router.get("/", todoController.getIndex);

module.exports = router;
