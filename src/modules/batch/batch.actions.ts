"use server";

import { AppError, UnauthorizedError } from "@/lib/errors";
import { fail, ok, type Result } from "@/lib/result";

import { getCurrentWorkspace } from "@/modules/workspace";

import {
  createBatch,
  getBatchPage,
} from "./batch.service";

import type {
  BatchDTO,
  BatchPageDTO,
  CreateBatchInput,
} from "./batch.types";

type CreateBatchActionInput = CreateBatchInput & {
  slug: string;
};

export async function getBatchPageAction(
  instituteId: string,
): Promise<Result<BatchPageDTO>> {
  try {
    const data = await getBatchPage(instituteId);

    return ok(data);
  } catch (error) {
    if (error instanceof AppError) {
      return fail(error.message, error.code);
    }

    console.error("Get batches failed:", error);

    return fail(
      "Failed to load batches.",
      "UNKNOWN",
    );
  }
}

export async function createBatchAction(
  input: CreateBatchActionInput,
): Promise<Result<BatchDTO>> {
  try {
    const workspace =
      await getCurrentWorkspace(input.slug);

    if (workspace.membership.role !== "owner") {
      throw new UnauthorizedError(
        "Only institute owners can create batches.",
      );
    }

    const batch = await createBatch({
      instituteId: workspace.institute.id,

      name: input.name,
      description: input.description,
      teacherId: input.teacherId,
      startDate: input.startDate,
      endDate: input.endDate,
    });

    return ok(batch);
  } catch (error) {
    if (error instanceof AppError) {
      return fail(error.message, error.code);
    }

    console.error("Create batch failed:", error);

    return fail(
      "Failed to create batch.",
      "UNKNOWN",
    );
  }
}