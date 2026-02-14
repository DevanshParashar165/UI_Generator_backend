import express from "express";
import {
  createGeneration,
  getGenerations,
} from "../controllers/generation.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { aiLimiter } from "../middlewares/aiLimiter.middleware.js";

const generationRoute = express.Router();

generationRoute.use(authMiddleware);

generationRoute.post("/", aiLimiter, createGeneration);
generationRoute.get("/:projectId", getGenerations);

export default generationRoute;
