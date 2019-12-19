const Todo = require("../models/todo");

exports.getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.findAllTodos();
    res.json(todos);
  } catch (err) {
    res.json({
      status: 400
    });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findTodo(req.params.todoId);
    res.json(todo);
  } catch (err) {
    res.json({
      status: 400
    });
  }
};

exports.postTodo = async (req, res) => {
  try {
    if (!req.body.title) throw new Error("Todo title is undefined.");
    const todoId = await Todo.createNewTodo(req.body.title);
    res.json({
      status: 200,
      id: todoId
    });
  } catch (err) {
    res.json({
      status: 400
    });
  }
};
