import { notFound } from "next/navigation";

import { NotFoundError } from "@/lib/errors";

import { getWorkspace } from "./workspace.service";
import type { WorkspaceDTO } from "./workspace.types";

type LoadWorkspaceParams = {
  slug: string;
  userId: string;
};

export async function loadWorkspace({ slug, userId }: LoadWorkspaceParams): Promise<WorkspaceDTO> {
  try {
    return await getWorkspace({
      slug,
      userId,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    }

    throw error;
  }
}
