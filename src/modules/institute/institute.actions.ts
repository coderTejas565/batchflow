"use server";

import { createInstitute, getUserInstitutes } from "./institute.service";
import { requireAuth } from "@/lib/auth/session";
import { AppError } from "@/lib/errors";
import { ok, fail, type Result } from "@/lib/result";
import type { InstituteDTO, UserInstituteDTO } from "./institute.types";

export async function createInstituteAction(input: unknown): Promise<Result<InstituteDTO>> {
  try {
    const session = await requireAuth();
    const data = await createInstitute(input, session.user.id);
    return ok(data);
  } catch (error) {
    if (error instanceof AppError) {
      return fail(error.message, error.code);
    }
    console.error("Create institute failed:", error);
    return fail("Failed to create institute.", "UNKNOWN");
  }
}

export async function getUserInstitutesAction(): Promise<Result<UserInstituteDTO[]>> {
  try {
    const session = await requireAuth();
    const data = await getUserInstitutes(session.user.id);
    return ok(data);
  } catch (error) {
    if (error instanceof AppError) {
      return fail(error.message, error.code);
    }
    console.error("Get institutes failed:", error);
    return fail("Failed to fetch institutes.", "UNKNOWN");
  }
}
