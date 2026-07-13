import { and, asc, eq } from "drizzle-orm";

import { db } from "@/db";

import {
  batch,
} from "@/db/schema/batch";

import { instituteMember } from "@/db/schema/institute";

import { user } from "@/db/schema/auth";

type InstituteParams = {
  instituteId: string;
};

type FindBatchByIdParams = {
  batchId: string;
  instituteId: string;
};

type CreateBatchParams = {
  id: string;
  instituteId: string;
  teacherId: string;
  name: string;
  description: string | null;
  startDate: Date | null;
  endDate: Date | null;
};

type FindTeacherParams = {
  instituteId: string;
  teacherId: string;
};

async function findBatches({
  instituteId,
}: InstituteParams) {
  return db
    .select({
      id: batch.id,
      name: batch.name,
      description: batch.description,

      status: batch.status,

      startDate: batch.startDate,
      endDate: batch.endDate,

      createdAt: batch.createdAt,

      teacher: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
    })
    .from(batch)
    .innerJoin(
      user,
      eq(user.id, batch.teacherId)
    )
    .where(eq(batch.instituteId, instituteId))
    .orderBy(asc(batch.name));
}

async function findTeachers({
  instituteId,
}: InstituteParams) {
  return db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
    })
    .from(instituteMember)
    .innerJoin(
      user,
      eq(user.id, instituteMember.userId)
    )
    .where(
      and(
        eq(instituteMember.instituteId, instituteId),
        eq(instituteMember.role, "teacher")
      )
    )
    .orderBy(asc(user.name));
}

async function findTeacher({
  instituteId,
  teacherId,
}: FindTeacherParams) {
  const [teacher] = await db
    .select({
      id: user.id,
    })
    .from(instituteMember)
    .innerJoin(
      user,
      eq(user.id, instituteMember.userId)
    )
    .where(
      and(
        eq(instituteMember.instituteId, instituteId),
        eq(instituteMember.role, "teacher"),
        eq(user.id, teacherId)
      )
    )
    .limit(1);

  return teacher ?? null;
}

async function findBatchById({
  batchId,
  instituteId,
}: FindBatchByIdParams) {
  const [result] = await db
    .select({
      id: batch.id,
    })
    .from(batch)
    .where(
      and(
        eq(batch.id, batchId),
        eq(batch.instituteId, instituteId)
      )
    )
    .limit(1);

  return result ?? null;
}

async function createBatch({
  id,
  instituteId,
  teacherId,
  name,
  description,
  startDate,
  endDate,
}: CreateBatchParams) {
  await db.insert(batch).values({
    id,
    instituteId,
    teacherId,
    name,
    description,
    startDate,
    endDate,
  });

  const [createdBatch] = await db
    .select({
      id: batch.id,
      name: batch.name,
      description: batch.description,

      status: batch.status,

      startDate: batch.startDate,
      endDate: batch.endDate,

      createdAt: batch.createdAt,

      teacher: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
    })
    .from(batch)
    .innerJoin(
      user,
      eq(user.id, batch.teacherId)
    )
    .where(eq(batch.id, id))
    .limit(1);

  if (!createdBatch) {
    throw new Error("Failed to create batch.");
  }

  return createdBatch;
}

export const batchRepository = {
  findBatches,
  findTeachers,

  findTeacher,
  findBatchById,

  createBatch,
};