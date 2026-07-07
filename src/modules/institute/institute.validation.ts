import { z } from "zod";

export const createInstituteSchema = z.object({
  name: z.string().min(2).max(100),
});

export type CreateInstituteInput = z.infer<typeof createInstituteSchema>;
