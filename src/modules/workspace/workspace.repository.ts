import { and, eq } from "drizzle-orm";

import { db } from "@/db";

import { institute, instituteMember } from "@/db/schema/institute";
import { user } from "@/db/schema/auth";

type FindWorkspaceParams = {
  slug: string;
  userId: string;
};

async function findWorkspace({ slug, userId }: FindWorkspaceParams) {
  const [workspace] = await db
    .select({
      institute: {
        id: institute.id,
        name: institute.name,
        slug: institute.slug,
        logo: institute.logo,
      },

      membership: {
        role: instituteMember.role,
        joinedAt: instituteMember.joinedAt,
      },

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
    })
    .from(institute)
    .innerJoin(instituteMember, eq(instituteMember.instituteId, institute.id))
    .innerJoin(user, eq(user.id, instituteMember.userId))
    .where(and(eq(institute.slug, slug), eq(instituteMember.userId, userId)))
    .limit(1);

  return workspace ?? null;
}

export const workspaceRepository = {
  findWorkspace,
};
