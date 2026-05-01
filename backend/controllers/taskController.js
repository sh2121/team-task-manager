const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find().populate("assignedTo");
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

exports.getDashboard = async (req, res) => {
  const tasks = await Task.find();

  const total = tasks.length;

  const completed = tasks.filter(
    (t) => t.status === "Done"
  ).length;

  const inProgress = tasks.filter(
    (t) => t.status === "In Progress"
  ).length;

  const todo = tasks.filter(
    (t) => t.status === "Todo"
  ).length;

  const overdue = tasks.filter(
    (t) =>
      t.dueDate && new Date(t.dueDate) < new Date()
  ).length;

  res.json({
    total,
    completed,
    inProgress,
    todo,
    overdue
  });
};