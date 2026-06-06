import prisma from "../config/prisma.js";

export const createUserWithAccount = async ({
  email,
  passwordHash,
  name,
  provider,
  providerAccountId,
}) => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        passwordHash,
        name,
      },
    });

    await tx.account.create({
      data: {
        userId: user.id,
        provider,
        providerAccountId,
      },
    });

    return user;
  });
};
