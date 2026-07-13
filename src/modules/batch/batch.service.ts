import { randomUUID } from "crypto";

import { batchRepository } from "./batch.repository";

import type {
  BatchDTO,
  BatchPageDTO,
} from "./batch.types";

import {
  createBatchSchema,
} from "./batch.validation";

import { parseOrThrow } from "@/lib/validate";

import {
  NotFoundError,
  ValidationError,
} from "@/lib/errors";

export async function getBatchPage(
  instituteId: string,
): Promise<BatchPageDTO> {
  const [batches, teachers] =
    await Promise.all([
      batchRepository.findBatches({
        instituteId,
      }),

      batchRepository.findTeachers({
        instituteId,
      }),
    ]);

  return {
    batches,
    teachers,
  };
}

type CreateBatchParams = {
  instituteId: string;
  name: string;
  description?: string;
  teacherId: string;
  startDate?: Date;
  endDate?: Date;
};

export async function createBatch({
  instituteId,
  ...input
}: CreateBatchParams): Promise<BatchDTO> {
  const data = parseOrThrow(
    createBatchSchema,
    input,
  );

  if (
    data.startDate &&
    data.endDate &&
    data.endDate < data.startDate
  ) {
    throw new ValidationError(
      "End date must be after the start date.",
    );
  }

  const teacher =
    await batchRepository.findTeacher({
      instituteId,
      teacherId: data.teacherId,
    });

  if (!teacher) {
    throw new NotFoundError(
      "Teacher not found.",
    );
  }

  return batchRepository.createBatch({
    id: randomUUID(),
    instituteId,

    teacherId: data.teacherId,

    name: data.name,

    description:
      data.description || null,

    startDate:
      data.startDate ?? null,

    endDate:
      data.endDate ?? null,
  });
}