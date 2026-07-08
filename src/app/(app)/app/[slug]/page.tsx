import { Button } from "@/components/ui/button";


import { getDashboardStats } from "@/modules/dashboard";
import { getCurrentWorkspace } from "@/modules/workspace";

type WorkspacePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function WorkspacePage({
  params,
}: WorkspacePageProps) {
 const { slug } = await params;

  const workspace = await getCurrentWorkspace(slug);

  const stats = await getDashboardStats(
    workspace.institute.id
  );

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back 👋
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your institute from one place.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-6">
          <h2 className="text-sm font-medium text-muted-foreground">
            Teachers
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {stats.teachers}
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-sm font-medium text-muted-foreground">
            Students
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {stats.students}
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-sm font-medium text-muted-foreground">
            Pending Invites
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {stats.pendingTeacherInvites}
          </p>
        </div>
      </section>

      <section className="rounded-xl border p-6">
        <h2 className="text-xl font-semibold">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Get started by inviting teachers or creating your first batch.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button>
            Invite Teacher
          </Button>

          <Button variant="outline">
            Create Batch
          </Button>

          <Button variant="outline">
            Add Student
          </Button>
        </div>
      </section>
    </div>
  );
}