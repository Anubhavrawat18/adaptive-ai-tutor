import { z } from "zod";

const resourceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  type: z.string(),
});

const taskSchema = z.object({
  title: z.string(),
  description: z.string(),
  estimatedHours: z.number().int().nonnegative(),
  taskType: z.string(),
  resources: z.array(resourceSchema),
});

const sectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  tasks: z.array(taskSchema).min(1),
});

export const roadmapSchema = z.object({
  title: z.string(),
  description: z.string(),
  sections: z.array(sectionSchema).min(1),
});
