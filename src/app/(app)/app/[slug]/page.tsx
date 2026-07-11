import { Button } from "@/components/ui/button";

import { getDashboardStats } from "@/modules/dashboard";
import { getCurrentWorkspace } from "@/modules/workspace";

type WorkspacePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { slug } = await params;

  const workspace = await getCurrentWorkspace(slug);

  const stats = await getDashboardStats(workspace.institute.id);

  const isOwner = workspace.membership.role === "owner";

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {workspace.user.name} 👋
        </h1>

        <p className="mt-2 text-muted-foreground">
          {isOwner
            ? "Manage your institute from one place."
            : `You're teaching at ${workspace.institute.name}.`}
        </p>
      </section>

      <section className={`grid gap-6 ${isOwner ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        <div className="rounded-xl border p-6">
          <h2 className="text-sm font-medium text-muted-foreground">Teachers</h2>

          <p className="mt-2 text-3xl font-bold">{stats.teachers}</p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-sm font-medium text-muted-foreground">Students</h2>

          <p className="mt-2 text-3xl font-bold">{stats.students}</p>
        </div>

        {isOwner && (
          <div className="rounded-xl border p-6">
            <h2 className="text-sm font-medium text-muted-foreground">Pending Invites</h2>

            <p className="mt-2 text-3xl font-bold">{stats.pendingTeacherInvites}</p>
          </div>
        )}
      </section>

      <section className="rounded-xl border p-6">
        <h2 className="text-xl font-semibold">Quick Actions</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {isOwner
            ? "Invite teachers and start building your institute."
            : "Access your teaching workspace and upcoming batches."}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {isOwner ? (
            <>
              <Button>Invite Teacher</Button>

              <Button variant="outline">Create Batch</Button>

              <Button variant="outline">Add Student</Button>
            </>
          ) : (
            <>
              <Button variant="outline">My Batches</Button>

              <Button variant="outline">My Students</Button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
