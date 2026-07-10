import { and, desc, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

import { db } from "@/db";

import { instituteMember, teacherInvite } from "@/db/schema/institute";

import type { TeacherInviteRecord } from "./teacher.types";

import { user } from "@/db/schema/auth";

const inviter = alias(user, "inviter");

type InstituteParams = {
  instituteId: string;
};

type FindInviteByEmailParams = {
  instituteId: string;
  email: string;
};

type CreateInviteParams = {
  id: string;
  instituteId: string;
  email: string;
  token: string;
  invitedBy: string;
  expiresAt: Date;
};

type FindTeacherByEmailParams = {
  instituteId: string;
  email: string;
};

async function findTeachers({ instituteId }: InstituteParams) {
  return db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      joinedAt: instituteMember.joinedAt,
      role: instituteMember.role,
    })
    .from(instituteMember)
    .innerJoin(user, eq(user.id, instituteMember.userId))
    .where(and(eq(instituteMember.instituteId, instituteId), eq(instituteMember.role, "teacher")))
    .orderBy(user.name);
}

async function findPendingInvites({ instituteId }: InstituteParams) {
  return db
    .select({
      id: teacherInvite.id,
      email: teacherInvite.email,
      status: teacherInvite.status,
      expiresAt: teacherInvite.expiresAt,
      createdAt: teacherInvite.createdAt,

      invitedBy: {
        id: inviter.id,
        name: inviter.name,
      },
    })
    .from(teacherInvite)
    .innerJoin(inviter, eq(inviter.id, teacherInvite.invitedBy))
    .where(and(eq(teacherInvite.instituteId, instituteId), eq(teacherInvite.status, "pending")))
    .orderBy(desc(teacherInvite.createdAt));
}

async function findInviteByEmail({ instituteId, email }: FindInviteByEmailParams) {
  const [invite] = await db
    .select()
    .from(teacherInvite)
    .where(
      and(
        eq(teacherInvite.instituteId, instituteId),
        eq(teacherInvite.email, email),
        eq(teacherInvite.status, "pending"),
      ),
    )
    .limit(1);

  return invite ?? null;
}

async function createInvite({
  id,
  instituteId,
  email,
  token,
  invitedBy,
  expiresAt,
}: CreateInviteParams): Promise<TeacherInviteRecord> {
  await db.insert(teacherInvite).values({
    id,
    instituteId,
    email,
    token,
    invitedBy,
    expiresAt,
  });

  const [invite] = await db
    .select({
      id: teacherInvite.id,
      email: teacherInvite.email,
      token: teacherInvite.token,
      status: teacherInvite.status,
      expiresAt: teacherInvite.expiresAt,
      createdAt: teacherInvite.createdAt,

      invitedBy: {
        id: user.id,
        name: user.name,
      },
    })
    .from(teacherInvite)
    .innerJoin(user, eq(user.id, teacherInvite.invitedBy))
    .where(eq(teacherInvite.id, id))
    .limit(1);

  return invite;
}

async function findTeacherByEmail({ instituteId, email }: FindTeacherByEmailParams) {
  const [teacher] = await db
    .select({
      id: user.id,
    })
    .from(instituteMember)
    .innerJoin(user, eq(user.id, instituteMember.userId))
    .where(
      and(
        eq(instituteMember.instituteId, instituteId),
        eq(instituteMember.role, "teacher"),
        eq(user.email, email),
      ),
    )
    .limit(1);

  return teacher ?? null;
}

export const teacherRepository = {
  findTeachers,
  findPendingInvites,

  findInviteByEmail,
  findTeacherByEmail,

  createInvite,
};
