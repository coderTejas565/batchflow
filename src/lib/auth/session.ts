import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { UnauthorizedError } from "@/lib/errors";

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new UnauthorizedError();
  }
  return session; // session.user.id is now guaranteed to exist
}
