import { and, count, eq } from "drizzle-orm";

import { db } from "@/db";

import {
  instituteMember,
  teacherInvite,
} from "@/db/schema/institute";

type CountDashboardStatsParams = {
  instituteId: string;
};

async function countDashboardStats({
  instituteId,
}: CountDashboardStatsParams) {
  const [
    [{ teachers }],
    [{ students }],
    [{ pendingTeacherInvites }],
  ] = await Promise.all([
    db
      .select({
        teachers: count(),
      })
      .from(instituteMember)
      .where(
        and(
          eq(instituteMember.instituteId, instituteId),
          eq(instituteMember.role, "teacher")
        )
      ),

    db
      .select({
        students: count(),
      })
      .from(instituteMember)
      .where(
        and(
          eq(instituteMember.instituteId, instituteId),
          eq(instituteMember.role, "student")
        )
      ),

    db
      .select({
        pendingTeacherInvites: count(),
      })
      .from(teacherInvite)
      .where(
        and(
          eq(teacherInvite.instituteId, instituteId),
          eq(teacherInvite.status, "pending")
        )
      ),
  ]);

  return {
    teachers,
    students,
    pendingTeacherInvites,
  };
}

export const dashboardRepository = {
  countDashboardStats,
};