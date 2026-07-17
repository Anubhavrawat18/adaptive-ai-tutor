import {
  createRoadmap,
  createRoadmapWithContent,
  getRoadmapsByUserId,
  getRoadmapById,
  updateRoadmap,
  deleteRoadmap,
} from "../repositories/roadmap.repository.js";

import { generateRoadmap as generateAIRoadmap } from "../ai/ai.service.js";
import { ApiError } from "../utils/ApiError.js";

export const generateRoadmapForUser = async (
  userId,
  { goal, level, duration },
) => {
  const roadmap = await generateAIRoadmap({
    goal,
    level,
    duration,
  });

  roadmap.goal = goal;
  roadmap.level = level;

  return await createRoadmapWithContent(userId, roadmap);
};

export const getUserRoadmaps = async (userId) => {
  return getRoadmapsByUserId(userId);
};

export const getUserRoadmap = async (userId, roadmapId) => {
  const roadmap = await getRoadmapById(roadmapId);

  if (!roadmap || roadmap.userId !== userId) {
    throw new ApiError(404, "Roadmap not found");
  }

  return roadmap;
};

export const updateUserRoadmap = async (userId, roadmapId, data) => {
  const roadmap = await getRoadmapById(roadmapId);

  if (!roadmap || roadmap.userId !== userId) {
    throw new ApiError(404, "Roadmap not found");
  }

  return updateRoadmap(roadmapId, data);
};

export const deleteUserRoadmap = async (userId, roadmapId) => {
  const roadmap = await getRoadmapById(roadmapId);

  if (!roadmap || roadmap.userId !== userId) {
    throw new ApiError(404, "Roadmap not found");
  }

  await deleteRoadmap(roadmapId);

  return {
    message: "Roadmap deleted successfully",
  };
};
