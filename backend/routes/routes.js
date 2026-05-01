const express = require("express");
const router = express.Router();
const project = require("../controllers/projectController");

const auth = require("../controllers/authController");
const task = require("../controllers/taskController");
const authMiddleware = require("../middleware/auth");

router.post("/signup", auth.signup);
router.post("/login", auth.login);

router.post("/task", authMiddleware, task.createTask);
router.get("/tasks", authMiddleware, task.getTasks);
router.put("/task/:id", authMiddleware, task.updateTask);
router.post("/project", authMiddleware, project.createProject);
router.get("/projects", authMiddleware, project.getProjects);
router.get("/dashboard", authMiddleware, task.getDashboard);
router.get("/users", authMiddleware, auth.getUsers);

module.exports = router;