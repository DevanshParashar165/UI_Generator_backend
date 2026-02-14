import {Router} from "express";
import { generateUI } from "../controllers/ai.controller.js";
import { aiLimiter } from "../middlewares/aiLimiter.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const aiRoute = Router();

aiRoute.post("/generate", aiLimiter,authMiddleware,generateUI);

export default aiRoute;
