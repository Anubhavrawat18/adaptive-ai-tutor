import * as roadmapService from "../../services/roadmap.service.js";

// AI Roadmap
export const generateRoadmapWithAI = async (req, res) => {
  const roadmap = await roadmapService.generateRoadmapForUser(
    req.user.userId,
    req.body,
  );

  return res.status(201).json({
    success: true,
    data: roadmap,
  });
};

export const getRoadmaps = async (req, res) => {
  const roadmaps = await roadmapService.getUserRoadmaps(req.user.userId);

  return res.status(200).json({
    success: true,
    data: roadmaps,
  });
};

export const getRoadmap = async (req, res) => {
  const roadmap = await roadmapService.getUserRoadmap(
    req.user.userId,
    req.params.id,
  );

  return res.status(200).json({
    success: true,
    data: roadmap,
  });
};

export const updateRoadmap = async (req, res) => {
  const roadmap = await roadmapService.updateUserRoadmap(
    req.user.userId,
    req.params.id,
    req.body,
  );

  return res.status(200).json({
    success: true,
    data: roadmap,
  });
};

export const deleteRoadmap = async (req, res) => {
  const result = await roadmapService.deleteUserRoadmap(
    req.user.userId,
    req.params.id,
  );

  return res.status(200).json({
    success: true,
    message: result.message,
  });
};
