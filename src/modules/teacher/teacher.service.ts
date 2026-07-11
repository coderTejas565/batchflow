import { randomUUID } from "crypto";

import { teacherRepository } from "./teacher.repository";

import { inviteTeacherSchema } from "./teacher.validation";

import { parseOrThrow } from "@/lib/validate";

import { sendTeacherInviteEmail } from "@/modules/email";
import { getAppUrl } from "@/lib/url";

import type {
  AcceptTeacherInviteDTO,
  InviteTeacherInput,
  TeacherInviteDTO,
  TeacherInviteDetailsDTO,
  TeacherPageDTO,
} from "./teacher.types";

import { ConflictError, NotFoundError, UnauthorizedError } from "@/lib/errors";

export async function getTeacherPage(instituteId: string): Promise<TeacherPageDTO> {
  const [teachers, pendingInvites] = await Promise.all([
    teacherRepository.findTeachers({
      instituteId,
    }),

    teacherRepository.findPendingInvites({
      instituteId,
    }),
  ]);

  return {
    teachers,
    pendingInvites,
  };
}

type InviteTeacherParams = InviteTeacherInput & {
  instituteId: string;
  instituteName: string;
  invitedBy: string;
};

export async function inviteTeacher({
  instituteId,
  invitedBy,
  instituteName,
  email,
}: InviteTeacherParams): Promise<TeacherInviteDTO> {
  const data = parseOrThrow(inviteTeacherSchema, {
    email,
  });

  const existingInvite = await teacherRepository.findInviteByEmail({
    instituteId,
    email: data.email,
  });

  if (existingInvite) {
    throw new ConflictError("A pending invitation already exists for this email.");
  }

  const existingTeacher = await teacherRepository.findTeacherByEmail({
    instituteId,
    email: data.email,
  });

  if (existingTeacher) {
    throw new ConflictError("This teacher is already part of the institute.");
  }

  const invite = await teacherRepository.createInvite({
    id: randomUUID(),
    instituteId,
    email: data.email,
    invitedBy,
    token: randomUUID(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  if (!invite) {
    throw new Error("Failed to create teacher invite");
  }

  await sendTeacherInviteEmail({
    to: invite.email,
    instituteName,
    inviteLink: `${getAppUrl()}/invite/${invite.token}`,
  });

  return {
    id: invite.id,
    email: invite.email,
    status: invite.status,
    expiresAt: invite.expiresAt,
    createdAt: invite.createdAt,
    invitedBy: invite.invitedBy,
  };
}

export async function validateInvite(token: string): Promise<TeacherInviteDetailsDTO> {
  const invite = await teacherRepository.findInviteByToken({
    token,
  });

  if (!invite) {
    throw new NotFoundError("Invitation not found.");
  }

  if (invite.status !== "pending") {
    throw new ConflictError("This invitation has already been used.");
  }

  if (invite.expiresAt.getTime() < Date.now()) {
    throw new ConflictError("This invitation has expired.");
  }

  return invite;
}

type AcceptTeacherInviteParams = {
  token: string;
  userId: string;
  email: string;
};

export async function acceptTeacherInvite({
  token,
  userId,
  email,
}: AcceptTeacherInviteParams): Promise<AcceptTeacherInviteDTO> {
  const invite = await validateInvite(token);

  if (invite.email.toLowerCase() !== email.toLowerCase()) {
    throw new UnauthorizedError("This invitation was sent to a different email address.");
  }

  const existingMember = await teacherRepository.findMember({
    instituteId: invite.institute.id,
    userId,
  });

  if (existingMember) {
    throw new ConflictError("You are already a member of this institute.");
  }

  await teacherRepository.createTeacherMembership({
    id: randomUUID(),
    instituteId: invite.institute.id,
    userId,
  });

  await teacherRepository.markInviteAccepted({
    inviteId: invite.id,
    userId,
  });

  return {
    instituteSlug: invite.institute.slug,
  };
}
