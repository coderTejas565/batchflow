"use server";

import { AppError, UnauthorizedError } from "@/lib/errors";
import { fail, ok, type Result } from "@/lib/result";

import { getCurrentWorkspace } from "@/modules/workspace";

import { createBatch, getBatchPage, getBatchDetails } from "./batch.service";

import type { BatchDTO, BatchPageDTO, BatchDetailsDTO, CreateBatchFormValues } from "./batch.types";

type CreateBatchActionInput = CreateBatchFormValues & {
  slug: string;
};

type GetBatchDetailsActionParams = {
  slug: string;
  batchId: string;
};

export async function getBatchPageAction(instituteId: string): Promise<Result<BatchPageDTO>> {
  try {
    const data = await getBatchPage(instituteId);

    return ok(data);
  } catch (error) {
    if (error instanceof AppError) {
      return fail(error.message, error.code);
    }

    console.error("Get batches failed:", error);

    return fail("Failed to load batches.", "UNKNOWN");
  }
}

export async function createBatchAction(input: CreateBatchActionInput): Promise<Result<BatchDTO>> {
  try {
    const workspace = await getCurrentWorkspace(input.slug);


    if (workspace.membership.role !== "owner") {
      throw new UnauthorizedError("Only institute owners can create batches.");
    }

    const batch = await createBatch({
      instituteId: workspace.institute.id,
      createdBy: workspace.user.id,

      name: input.name,

      description: input.description ?? null,

      teacherId: input.teacherId,

      startDate: input.startDate ? new Date(input.startDate) : null,

      endDate: input.endDate ? new Date(input.endDate) : null,
    });


    return ok(batch);
  } catch (error) {
    if (error instanceof AppError) {
      return fail(error.message, error.code);
    }

    console.error("Create batch failed:", error);

    return fail("Failed to create batch.", "UNKNOWN");
  }
}

export async function getBatchDetailsAction({
  slug,
  batchId,
}: GetBatchDetailsActionParams): Promise<Result<BatchDetailsDTO>> {
  try {
    const workspace = await getCurrentWorkspace(slug);

    const batch = await getBatchDetails(workspace.institute.id, batchId);

    return ok(batch);
  } catch (error) {
    if (error instanceof AppError) {
      return fail(error.message, error.code);
    }

    console.error("Get batch details failed:", error);

    return fail("Failed to load batch.", "UNKNOWN");
  }
}
