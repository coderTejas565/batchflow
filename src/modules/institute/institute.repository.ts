import { eq } from "drizzle-orm";

import type { DBExecutor } from "@/db/types";
import { institute, instituteMember } from "@/db/schema/institute";

import type {
  CreateInstituteMemberRecord,
  CreateInstituteRecord,
  InstituteModel,
  UserInstituteDTO,
} from "./institute.types";

export function createInstituteRepository(executor: DBExecutor) {
  return {
    findBySlug(slug: string): Promise<InstituteModel | undefined> {
      return executor.query.institute.findFirst({
        where: eq(institute.slug, slug),
      });
    },

    create(data: CreateInstituteRecord) {
      return executor.insert(institute).values(data);
    },

    addMember(data: CreateInstituteMemberRecord) {
      return executor.insert(instituteMember).values(data);
    },

    listByUser(userId: string): Promise<UserInstituteDTO[]> {
      return executor
        .select({
          instituteId: institute.id,
          name: institute.name,
          slug: institute.slug,
          logo: institute.logo,
          role: instituteMember.role,
          joinedAt: instituteMember.joinedAt,
        })
        .from(instituteMember)
        .innerJoin(institute, eq(institute.id, instituteMember.instituteId))
        .where(eq(instituteMember.userId, userId));
    },
  };
}

export type InstituteRepository = ReturnType<typeof createInstituteRepository>;
