"use server";

import { requireAuth } from "@/lib/auth/session";
import { AppError } from "@/lib/errors";
import {
  ok,
  fail,
  type Result,
} from "@/lib/result";

import {
  getTeacherPage,
  inviteTeacher,
} from "./teacher.service";

import type {
  TeacherInviteDTO,
  TeacherPageDTO,
} from "./teacher.types";

type InviteTeacherActionInput = {
  instituteId: string;
  email: string;
};

export async function getTeacherPageAction(
  instituteId: string
): Promise<Result<TeacherPageDTO>> {
  try {
    await requireAuth();

    const data = await getTeacherPage(instituteId);

    return ok(data);
  } catch (error) {
    if (error instanceof AppError) {
      return fail(error.message, error.code);
    }

    console.error("Get teachers failed:", error);

    return fail(
      "Failed to load teachers.",
      "UNKNOWN"
    );
  }
}

export async function inviteTeacherAction(
  input: InviteTeacherActionInput
): Promise<Result<TeacherInviteDTO>> {
  try {
    const session = await requireAuth();

    const invite = await inviteTeacher({
      instituteId: input.instituteId,
      email: input.email,
      invitedBy: session.user.id,
    });

    return ok(invite);
  } catch (error) {
    if (error instanceof AppError) {
      return fail(error.message, error.code);
    }

    console.error("Invite teacher failed:", error);

    return fail(
      "Failed to invite teacher.",
      "UNKNOWN"
    );
  }
}