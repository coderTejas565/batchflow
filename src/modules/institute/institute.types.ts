import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import { institute, instituteMember, teacherInvite } from "@/db/schema/institute";

export type InstituteModel = InferSelectModel<typeof institute>;

export type InstituteInsert = InferInsertModel<typeof institute>;

export type InstituteMemberModel = InferSelectModel<typeof instituteMember>;

export type InstituteMemberInsert = InferInsertModel<typeof instituteMember>;

export type TeacherInviteModel = InferSelectModel<typeof teacherInvite>;

export type TeacherInviteInsert = InferInsertModel<typeof teacherInvite>;

export type InstituteDTO = Pick<InstituteModel, "id" | "name" | "slug">;

export type CreateInstituteRecord = Omit<InstituteInsert, "createdAt" | "updatedAt">;

export type CreateInstituteMemberRecord = Omit<InstituteMemberInsert, "joinedAt">;

export type UserInstituteDTO = {
  instituteId: string;
  name: string;
  slug: string;
  logo: string | null;
  role: InstituteMemberModel["role"];
  joinedAt: Date;
};
