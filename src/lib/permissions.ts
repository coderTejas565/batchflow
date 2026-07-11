import { UnauthorizedError } from "@/lib/errors";

export function requireOwner(role: "owner" | "teacher" | "student") {
  if (role !== "owner") {
    throw new UnauthorizedError("Only institute owners can perform this action.");
  }
}
