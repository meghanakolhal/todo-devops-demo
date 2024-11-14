const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;
app.use(cors({
  origin: '*', // This will allow all origins
}));
app.use(bodyParser.json());

let tasks = [];

app.get("/", (req, res) =>   res.send("HELLO WORLD"
));
// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST a new task
app.post("/tasks", (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.status(201).json(task);
});

// DELETE a task
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(task => task.id !== req.params.id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
