import {
  findUserById,
  updateUser,
  deleteUser,
} from "../repositories/user.repository.js";

import { ApiError } from "../utils/ApiError.js";

const sanitizeUser = (user) => {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
};

export const getCurrentUser = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return sanitizeUser(user);
};

export const updateCurrentUser = async (userId, data) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const updatedUser = await updateUser(userId, data);

  return sanitizeUser(updatedUser);
};

export const deleteCurrentUser = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  await deleteUser(userId);

  return {
    message: "User deleted successfully",
  };
};
