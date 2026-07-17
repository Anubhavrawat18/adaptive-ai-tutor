export const mapRoadmapToDatabase = ({ goal, level, roadmap }) => {
  return {
    title: roadmap.title,
    description: roadmap.description,
    goal,
    level,
    progress: 0,
    status: "IN_PROGRESS",

    sections: roadmap.sections.map((section, sectionIndex) => ({
      title: section.title,
      description: section.description,
      displayOrder: sectionIndex + 1,

      tasks: section.tasks.map((task, taskIndex) => ({
        title: task.title,
        description: task.description,
        displayOrder: taskIndex + 1,
        estimatedHours: task.estimatedHours,
        taskType: task.taskType,
        resources: task.resources,
        status: "NOT_STARTED",
      })),
    })),
  };
};
