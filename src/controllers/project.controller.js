import Project from "../models/project.model.js";

export const createProject = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title } = req.body;

    const project = await Project.create({
      userId,
      title,
    });

    return res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("createProject error:", error.message);
    res.status(500).json({ success: false, message: "Failed to create project" });
  }
};


export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("getProjects error:", error.message);
    res.status(500).json({ success: false });
  }
};


export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    console.error("getProjectById error:", error.message);
    res.status(500).json({ success: false });
  }
};
