import { ZodError, type ZodSchema } from "zod";
import { ValidationError } from "@/lib/errors";

export function parseOrThrow<T>(schema: ZodSchema<T>, input: unknown): T {
  try {
    return schema.parse(input);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError(error.issues[0]?.message ?? "Invalid input");
    }

    throw error;
  }
}
