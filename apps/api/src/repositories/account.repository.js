import prisma from "../config/prisma.js";

export const findAccount = async (provider, providerAccountId) => {
  return prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider,
        providerAccountId,
      },
    },
    include: {
      user: true,
    },
  });
};

export const createAccount = async (data) => {
  return prisma.account.create({
    data,
  });
};

export const findAccountsByUserId = async (userId) => {
  return prisma.account.findMany({
    where: {
      userId,
    },
  });
};
