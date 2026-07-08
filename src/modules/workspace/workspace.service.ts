import { NotFoundError } from "@/lib/errors";

import { workspaceRepository } from "./workspace.repository";
import type { WorkspaceDTO } from "./workspace.types";

type GetWorkspaceParams = {
  slug: string;
  userId: string;
};

export async function getWorkspace({
  slug,
  userId,
}: GetWorkspaceParams): Promise<WorkspaceDTO> {
  const workspace = await workspaceRepository.findWorkspace({
    slug,
    userId,
  });

  if (!workspace) {
    throw new NotFoundError("Workspace not found.");
  }

  return workspace;
}