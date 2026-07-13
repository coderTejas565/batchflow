import { randomUUID } from "crypto";

import { batchRepository } from "./batch.repository";

import type { BatchDTO, BatchPageDTO, BatchDetailsDTO } from "./batch.types";

import { createBatchSchema } from "./batch.validation";

import { parseOrThrow } from "@/lib/validate";

import { NotFoundError, ValidationError } from "@/lib/errors";

export async function getBatchPage(instituteId: string): Promise<BatchPageDTO> {
  const [batches, teachers] = await Promise.all([
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
    instituteId:string;
    createdBy:string;

    name:string;
    description?:string | null;

    teacherId:string;

    startDate?:Date | null;
    endDate?:Date | null;
}

export async function createBatch({
  instituteId,
  createdBy,
  name,
  description,
  teacherId,
  startDate,
  endDate,
}: CreateBatchParams): Promise<BatchDTO> {
  const data = parseOrThrow(createBatchSchema, {
    name,
    description,
    teacherId,
    startDate,
    endDate,
  });

  if (data.startDate && data.endDate && data.endDate < data.startDate) {
    throw new ValidationError("End date must be after the start date.");
  }

  const teacher = await batchRepository.findInstituteTeacher({
    instituteId,
    teacherId: data.teacherId,
  });

  if (!teacher) {
    throw new NotFoundError("Teacher not found.");
  }

  return batchRepository.createBatch({
    id: randomUUID(),
    instituteId,
    createdBy,

    teacherId: data.teacherId,

    name: data.name,
    description: data.description ?? null,

    startDate: data.startDate
    ? new Date(data.startDate)
    : null,

  endDate: data.endDate
    ? new Date(data.endDate)
    : null,
});
}

export async function getBatchDetails(
  instituteId: string,
  batchId: string,
): Promise<BatchDetailsDTO> {
  const batch =
    await batchRepository.findBatchDetails({
      instituteId,
      batchId,
    });

  if (!batch) {
    throw new NotFoundError(
      "Batch not found.",
    );
  }

  return batch;
}