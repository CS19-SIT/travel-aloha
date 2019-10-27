const axios = require("axios"); // This is not nescessary, unless you have to connect to other api
const db = require("../db/db");

exports.findAllTodos = async () => {
  try {
    /** What code should look like */
    // const todo = await db.query("SELECT * FROM todo");
    // return todo;

    /** This part is not relevant, just to mock data */
    const todos = await axios.get("https://jsonplaceholder.typicode.com/todos");
    return todos.data;
  } catch (err) {
    return err;
  }
};

exports.findTodo = async todoId => {
  try {
    /** What code should look like */
    if (!todoId) throw new Error("[ERR] findTodo: todoId is undefined.");
    // const todo = await db.query("SELECT * FROM todo WHERE id = ?", [todoId]);
    // return todo;

    /** This part is not relevant, just to mock data */
    const todo = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`
    );
    return todo.data;
  } catch (err) {
    return err;
  }
};

exports.createNewTodo = async title => {
  try {
    /** What code should look like */
    if (!title)
      throw new Error("[ERR] createNewTodo: title is undefined.");
    // await db.query("INSERT INTO todo VALUES (?, ?, ?, ?)", [todoData.id, todoData.userId, todoData.title, todoData.completed]);

    /** This part is not relevant, just to mock data */
    const todo = await axios.post(
      `https://jsonplaceholder.typicode.com/todos/`,
      JSON.stringify({title}),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return todo.id;
  } catch (err) {
    throw new Error(err);
  }
};
