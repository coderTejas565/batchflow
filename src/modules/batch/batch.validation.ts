import { z } from "zod";

export const createBatchSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Batch name must be at least 2 characters.")
    .max(100, "Batch name must be less than 100 characters."),

  description: z
    .string()
    .trim()
    .max(500, "Description must be less than 500 characters.")
    .optional()
    .or(z.literal("")),

  teacherId: z
    .string()
    .min(1, "Please select a teacher."),

  startDate: z.date().optional(),

  endDate: z.date().optional(),
});

export const updateBatchSchema = createBatchSchema.extend({
  status: z.enum([
    "active",
    "completed",
    "archived",
  ]),
});

export type CreateBatchInput = z.infer<
  typeof createBatchSchema
>;

export type UpdateBatchInput = z.infer<
  typeof updateBatchSchema
>;