import {
  createRoadmap,
  getRoadmapsByUserId,
  getRoadmapById,
  updateRoadmap,
  deleteRoadmap,
} from "../repositories/roadmap.repository.js";

import { ApiError } from "../utils/ApiError.js";

export const createRoadmapForUser = async (userId, data) => {
  return createRoadmap({
    ...data,
    userId,
  });
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
