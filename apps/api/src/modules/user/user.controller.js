import * as userService from "../../services/user.service.js";

export const getCurrentUser = async (req, res) => {
  const user = await userService.getCurrentUser(req.user.userId);

  return res.status(200).json({
    success: true,
    data: user,
  });
};

export const updateCurrentUser = async (req, res) => {
  const user = await userService.updateCurrentUser(req.user.userId, req.body);

  return res.status(200).json({
    success: true,
    data: user,
  });
};

export const deleteCurrentUser = async (req, res) => {
  const result = await userService.deleteCurrentUser(req.user.userId);

  return res.status(200).json({
    success: true,
    message: result.message,
  });
};
