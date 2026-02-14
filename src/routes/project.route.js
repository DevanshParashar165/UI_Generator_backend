import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
} from "../controllers/project.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const projectRoute = express.Router();
projectRoute.use(authMiddleware);


projectRoute.post("/", createProject);
projectRoute.get("/", getProjects);
projectRoute.get("/:id", getProjectById);

export default projectRoute;
