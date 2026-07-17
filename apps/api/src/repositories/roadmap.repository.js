import prisma from "../config/prisma.js";

export const createRoadmapWithContent = async (userId, roadmap) => {
  return prisma.$transaction(async (tx) => {
    const createdRoadmap = await tx.roadmap.create({
      data: {
        userId,
        title: roadmap.title,
        description: roadmap.description,
        goal: roadmap.goal,
        level: roadmap.level,
        progress: 0,
      },
    });

    if (!roadmap.sections?.length) {
      throw new ApiError(500, "AI generated an empty roadmap.");
    }

    for (let i = 0; i < roadmap.sections.length; i++) {
      const section = roadmap.sections[i];

      const createdSection = await tx.roadmapSection.create({
        data: {
          roadmapId: createdRoadmap.id,
          title: section.title,
          description: section.description,
          displayOrder: i + 1,
        },
      });

      for (let j = 0; j < section.tasks.length; j++) {
        const task = section.tasks[j];

        await tx.roadmapTask.create({
          data: {
            sectionId: createdSection.id,
            title: task.title,
            description: task.description,
            displayOrder: j + 1,
            estimatedHours: task.estimatedHours,
            taskType: task.taskType,
            resources: task.resources,
          },
        });
      }
    }

    return tx.roadmap.findUnique({
      where: {
        id: createdRoadmap.id,
      },
      include: {
        sections: {
          orderBy: {
            displayOrder: "asc",
          },
          include: {
            tasks: {
              orderBy: {
                displayOrder: "asc",
              },
            },
          },
        },
      },
    });
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
