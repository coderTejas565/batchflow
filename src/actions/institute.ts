"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { instituteService } from "@/services/institute.service";
import {
  createInstituteSchema,
  type CreateInstituteInput,
} from "@/lib/validations/institute";

export async function createInstituteAction(
  input: CreateInstituteInput
) {
  // Validate input
  const parsed = createInstituteSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error:
        parsed.error.flatten().fieldErrors.name?.[0] ??
        "Invalid institute name.",
    };
  }

  // Get current user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  // Call business logic
  return instituteService.createInstitute({
    userId: session.user.id,
    name: parsed.data.name,
  });
}