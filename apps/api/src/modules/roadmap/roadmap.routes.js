import { Router } from "express";

import {
  createRoadmap,
  getRoadmaps,
  getRoadmap,
  updateRoadmap,
  deleteRoadmap,
} from "./roadmap.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/generate", generateRoadmapWithAI);

router.get("/", getRoadmaps);

router.get("/:id", getRoadmap);

router.patch("/:id", updateRoadmap);

router.delete("/:id", deleteRoadmap);

export default router;
