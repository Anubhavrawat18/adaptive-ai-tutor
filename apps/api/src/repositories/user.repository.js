import prisma from "../config/prisma.js";

export const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const updateUser = async (userId, data) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
};

export const deleteUser = async (userId) => {
  return prisma.user.delete({
    where: {
      id: userId,
    },
  });
};
