const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["Todo", "In Progress", "Done"],
    default: "Todo"
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  dueDate: Date
});

module.exports = mongoose.model("Task", taskSchema);