import slugify from "slugify";

import { db } from "@/db";
import { generateId } from "@/lib/id";
import { AppError, ConflictError } from "@/lib/errors";
import { parseOrThrow } from "@/lib/validate";
import { isUniqueViolation } from "@/lib/db-errors";

import { createInstituteRepository } from "./institute.repository";
import { createInstituteSchema } from "./institute.validation";

import type { InstituteDTO, UserInstituteDTO } from "./institute.types";

export async function createInstitute(input: unknown, userId: string): Promise<InstituteDTO> {
  const { name } = parseOrThrow(createInstituteSchema, input);

  const baseSlug = slugify(name, {
    lower: true,
    strict: true,
    trim: true,
  });

  const readRepo = createInstituteRepository(db);

  let slug = baseSlug;
  let count = 1;

  while (await readRepo.findBySlug(slug)) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  try {
    return await db.transaction(async (tx) => {
      const repo = createInstituteRepository(tx);

      const instituteId = generateId();

      await repo.create({
        id: instituteId,
        name,
        slug,
        ownerId: userId,
      });

      await repo.addMember({
        id: generateId(),
        instituteId,
        userId,
        role: "owner",
      });

      return {
        id: instituteId,
        name,
        slug,
      };
    });
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new ConflictError("An institute with this slug already exists.");
    }

    console.error("Create institute failed:", error);

    throw new AppError("Failed to create institute.", "CREATE_INSTITUTE_FAILED", 500);
  }
}

export async function getUserInstitutes(userId: string): Promise<UserInstituteDTO[]> {
  const repo = createInstituteRepository(db);

  return repo.listByUser(userId);
}
