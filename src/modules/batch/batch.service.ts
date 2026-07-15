import { randomUUID } from "crypto";

import { batchRepository } from "./batch.repository";

import type { BatchDTO, BatchPageDTO, BatchDetailsDTO, CreateBatchInput } from "./batch.types";

import { createBatchServiceSchema } from "./batch.service-schema";

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

export async function createBatch({
  instituteId,
  createdBy,
  ...input
}: {
  instituteId: string;
  createdBy: string;
} & CreateBatchInput): Promise<BatchDTO> {
  const data = parseOrThrow(createBatchServiceSchema, input);

  if (data.startDate && data.endDate && data.endDate < data.startDate) {
    throw new ValidationError("End date must be after the start date.");
  }

  const teacher = await batchRepository.findInstituteTeacher({
    instituteId,
    teacherId: data.teacherId,
  });
  console.log("Teacher:", teacher);

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

    startDate: data.startDate ?? null,

    endDate: data.endDate ?? null,
  });
}

export async function getBatchDetails(
  instituteId: string,
  batchId: string,
): Promise<BatchDetailsDTO> {
  const batch = await batchRepository.findBatchDetails({
    instituteId,
    batchId,
  });

  if (!batch) {
    throw new NotFoundError("Batch not found.");
  }

  return batch;
}
