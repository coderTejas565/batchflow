import { z } from "zod";

export const createInstituteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Institute name must be at least 3 characters.")
    .max(100, "Institute name cannot exceed 100 characters.")
    .regex(
      /^[a-zA-Z0-9\s&'().-]+$/,
      "Institute name contains invalid characters."
    ),
});

export type CreateInstituteInput = z.infer<typeof createInstituteSchema>;