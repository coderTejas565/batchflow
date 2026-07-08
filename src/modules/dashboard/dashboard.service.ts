import { dashboardRepository } from "./dashboard.repository";
import type { DashboardStatsDTO } from "./dashboard.types";

export async function getDashboardStats(
  instituteId: string
): Promise<DashboardStatsDTO> {
  const stats = await dashboardRepository.countDashboardStats({
    instituteId,
  });

  return {
    teachers: stats.teachers,
    students: stats.students,
    pendingTeacherInvites: stats.pendingTeacherInvites,
  };
}