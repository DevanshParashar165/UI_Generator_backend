import express from "express";
import {
  createMessage,
  getMessages,
} from "../controllers/message.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const messageRoute = express.Router();

messageRoute.use(authMiddleware);

messageRoute.post("/", createMessage);
messageRoute.get("/:projectId", getMessages);

export default messageRoute;
