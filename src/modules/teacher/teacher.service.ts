import { teacherRepository } from "./teacher.repository";

import type { TeacherPageDTO } from "./teacher.types";

export async function getTeacherPage(instituteId: string): Promise<TeacherPageDTO> {
  const [teachers, pendingInvites] = await Promise.all([
    teacherRepository.findTeachers({
      instituteId,
    }),
    teacherRepository.findPendingInvites({
      instituteId,
    }),
  ]);

  return {
    teachers,
    pendingInvites,
  };
}
