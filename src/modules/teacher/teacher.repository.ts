import { and, desc, eq } from "drizzle-orm";

import { db } from "@/db";

import { instituteMember, teacherInvite } from "@/db/schema/institute";

import { user } from "@/db/schema/auth";

import { alias } from "drizzle-orm/pg-core";

const inviter = alias(user, "inviter");

type InstituteParams = {
  instituteId: string;
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
    .innerJoin(
      inviter,
      eq(inviter.id, teacherInvite.invitedBy)
    )
    .where(
      and(
        eq(teacherInvite.instituteId, instituteId),
        eq(teacherInvite.status, "pending")
      )
    )
    .orderBy(desc(teacherInvite.createdAt));
}

export const teacherRepository = {
  findTeachers,
  findPendingInvites,
};
