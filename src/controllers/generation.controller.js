import Generation from "../models/generation.model.js";
import Project from "../models/project.model.js";
import Message from "../models/message.model.js";
import { askAI } from "../../sevices/openrouter.service.js";

/**
 * Generate New UI Version
 */
export const createGeneration = async (req, res) => {
  try {
    const { projectId, prompt } = req.body;

    if (!projectId || !prompt) {
      return res.status(400).json({
        success: false,
        message: "ProjectId and prompt required",
      });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // 🧠 save user message
    await Message.create({
      projectId,
      role: "user",
      content: prompt,
    });

    // 🔥 STRICT PROMPT FOR REACT LIVE
    const finalPrompt = `
Generate ONLY JSX UI using Tailwind CSS.
No imports.
No markdown.
No explanation.

User request: ${prompt}
`;

    const aiCode = await askAI(finalPrompt);

    // 🧠 Save assistant message
    await Message.create({
      projectId,
      role: "assistant",
      content: aiCode,
    });

    const newVersion = project.currentVersion + 1;

    const generation = await Generation.create({
      projectId,
      versionNumber: newVersion,
      code: aiCode,
      plan: prompt,
      explanation: "",
    });

    // update project version
    project.currentVersion = newVersion;
    await project.save();

    res.status(201).json({
      success: true,
      generation,
    });
  } catch (error) {
    console.error("createGeneration error:", error.message);
    res.status(500).json({
      success: false,
      message: "Generation failed",
    });
  }
};

/**
 * Get All Generations of Project
 */
export const getGenerations = async (req, res) => {
  try {
    const generations = await Generation.find({
      projectId: req.params.projectId,
    }).sort({ versionNumber: -1 });

    res.status(200).json({
      success: true,
      generations,
    });
  } catch (error) {
    console.error("getGenerations error:", error.message);
    res.status(500).json({ success: false });
  }
};
