const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ msg: "Only Admin can create project" });
    }

    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user.id
    });

    res.json(project);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find().populate("members");
  res.json(projects);
};