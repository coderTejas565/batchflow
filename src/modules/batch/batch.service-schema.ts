import { z } from "zod";

export const createBatchServiceSchema = z.object({
  name: z.string().trim().min(2).max(100),

  description: z.string().trim().max(500).nullable().optional(),

  teacherId: z.string(),

  startDate: z.date().nullable().optional(),

  endDate: z.date().nullable().optional(),
});

export const updateBatchServiceSchema = createBatchServiceSchema.extend({
  status: z.enum(["active", "completed", "archived"]),
});
