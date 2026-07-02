import prisma from "../config/prisma.js";

export const createRoadmap = async (data) => {
  return prisma.roadmap.create({
    data,
  });
};

export const getRoadmapsByUserId = async (userId) => {
  return prisma.roadmap.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getRoadmapById = async (id) => {
  return prisma.roadmap.findUnique({
    where: {
      id,
    },
    include: {
      sections: {
        include: {
          tasks: {
            orderBy: {
              displayOrder: "asc",
            },
          },
        },
        orderBy: {
          displayOrder: "asc",
        },
      },
    },
  });
};

export const updateRoadmap = async (id, data) => {
  return prisma.roadmap.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteRoadmap = async (id) => {
  return prisma.roadmap.delete({
    where: {
      id,
    },
  });
};
