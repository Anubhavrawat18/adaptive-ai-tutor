import prisma from "../config/prisma.js";

export const createRefreshToken = async (data) => {
  return prisma.refreshToken.create({
    data,
  });
};

export const findRefreshToken = async (tokenHash) => {
  return prisma.refreshToken.findUnique({
    where: {
      tokenHash,
    },
  });
};

export const deleteRefreshToken = async (tokenHash) => {
  return prisma.refreshToken.delete({
    where: {
      tokenHash,
    },
  });
};

export const deleteUserRefreshTokens = async (userId) => {
  return prisma.refreshToken.deleteMany({
    where: {
      userId,
    },
  });
};
