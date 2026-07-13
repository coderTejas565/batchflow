import { and, asc, eq } from "drizzle-orm";

import { db } from "@/db";

import { batch } from "@/db/schema/batch";

import { instituteMember } from "@/db/schema/institute";

import { user } from "@/db/schema/auth";

import type { BatchDTO, TeacherOptionDTO } from "./batch.types";

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
  createdBy: string;

  name: string;
  description: string | null;

  startDate: Date | null;
  endDate: Date | null;
};

type FindTeacherParams = {
  instituteId: string;
  teacherId: string;
};

const batchSelect = {
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
};

async function findBatches({ instituteId }: InstituteParams): Promise<BatchDTO[]> {
  return db
    .select(batchSelect)
    .from(batch)
    .innerJoin(user, eq(user.id, batch.teacherId))
    .where(eq(batch.instituteId, instituteId))
    .orderBy(asc(batch.name));
}

async function findTeachers({ instituteId }: InstituteParams): Promise<TeacherOptionDTO[]> {
  return db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
    })
    .from(instituteMember)
    .innerJoin(user, eq(user.id, instituteMember.userId))
    .where(and(eq(instituteMember.instituteId, instituteId), eq(instituteMember.role, "teacher")))
    .orderBy(asc(user.name));
}

async function findInstituteTeacher({ instituteId, teacherId }: FindTeacherParams) {
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
        eq(user.id, teacherId),
      ),
    )
    .limit(1);

  return teacher ?? null;
}

async function batchExists({ batchId, instituteId }: FindBatchByIdParams) {
  const [result] = await db
    .select({
      id: batch.id,
    })
    .from(batch)
    .where(and(eq(batch.id, batchId), eq(batch.instituteId, instituteId)))
    .limit(1);

  return result ?? null;
}

async function createBatch({
  id,
  instituteId,
  teacherId,
  createdBy,
  name,
  description,
  startDate,
  endDate,
}: CreateBatchParams): Promise<BatchDTO> {
  await db.insert(batch).values({
    id,
    instituteId,
    teacherId,
    createdBy,
    name,
    description,
    startDate,
    endDate,
  });
  const [createdBatch] = await db
    .select(batchSelect)
    .from(batch)
    .innerJoin(user, eq(user.id, batch.teacherId))
    .where(eq(batch.id, id))
    .limit(1);

  if (!createdBatch) {
    throw new Error(
  "Batch was created but could not be retrieved."
);
  }

  return createdBatch;
}

export const batchRepository = {
  findBatches,
  findTeachers,

  findInstituteTeacher,
  batchExists,

  createBatch,
};
