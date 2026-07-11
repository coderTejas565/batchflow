import { notFound } from "next/navigation";

import { AppError } from "@/lib/errors";

import { validateInvite } from "./teacher.service";

export async function loadInvite(token: string) {
  try {
    return await validateInvite(token);
  } catch (error) {
    if (error instanceof AppError) {
      notFound();
    }

    throw error;
  }
}
