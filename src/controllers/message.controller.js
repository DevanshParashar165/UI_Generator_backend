import Message from "../models/message.model.js";

/**
 * Save User / Assistant Message
 */
export const createMessage = async (req, res) => {
  try {
    const { projectId, role, content } = req.body;

    const message = await Message.create({
      projectId,
      role,
      content,
    });

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("createMessage error:", error.message);
    res.status(500).json({ success: false });
  }
};

/**
 * Get Chat History of Project
 */
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      projectId: req.params.projectId,
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("getMessages error:", error.message);
    res.status(500).json({ success: false });
  }
};
