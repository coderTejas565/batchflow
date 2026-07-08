import type { TeacherDTO } from "@/modules/teacher";

import { TeacherCard } from "./teacher-card";

type TeacherListProps = {
  teachers: TeacherDTO[];
};

export function TeacherList({
  teachers,
}: TeacherListProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">
          Teachers
        </h2>

        <p className="text-sm text-muted-foreground">
          Manage all teachers who have access to this institute.
        </p>
      </div>

      {teachers.length === 0 ? (
        <div className="rounded-lg border border-dashed py-12 text-center">
          <p className="font-medium">
            No teachers found
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Invite your first teacher to start collaborating.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {teachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
            />
          ))}
        </div>
      )}
    </section>
  );
}