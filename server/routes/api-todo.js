const express = require("express");
const router = express.Router();

const apiTodoController = require("../controllers/api-todo");

router.get("/", apiTodoController.getAllTodo);

router.get("/:todoId", apiTodoController.getTodo);

router.post("/", apiTodoController.postTodo);

module.exports = router;
