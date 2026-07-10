import { z } from "zod";

export const inviteTeacherSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

export type InviteTeacherInput = z.infer<typeof inviteTeacherSchema>;
