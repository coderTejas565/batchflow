import { cache } from "react";

import { requireAuth } from "@/lib/auth/session";

import { loadWorkspace } from "./workspace.loader";

export const getCurrentWorkspace = cache(
  async (slug: string) => {
    const session = await requireAuth();

    return loadWorkspace({
      slug,
      userId: session.user.id,
    });
  }
);