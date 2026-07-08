import { getCurrentWorkspace } from "@/modules/workspace";
import { getTeacherPage } from "@/modules/teacher";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type TeachersPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function TeachersPage({ params }: TeachersPageProps) {
  const { slug } = await params;

  const workspace = await getCurrentWorkspace(slug);

  const data = await getTeacherPage(workspace.institute.id);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teachers</h1>

          <p className="text-muted-foreground">
            Manage teachers and invitations for{" "}
            <span className="font-medium">{workspace.institute.name}</span>
          </p>
        </div>

        {workspace.membership.role === "owner" && <Button>Invite Teacher</Button>}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teachers ({data.teachers.length})</CardTitle>
        </CardHeader>

        <CardContent>
          {data.teachers.length === 0 ? (
            <p className="text-sm text-muted-foreground">No teachers have joined yet.</p>
          ) : (
            <div className="space-y-4">
              {data.teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{teacher.name}</p>

                    <p className="text-sm text-muted-foreground">{teacher.email}</p>
                  </div>

                  <span className="text-sm text-muted-foreground">
                    Joined {teacher.joinedAt.toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pending Invitations ({data.pendingInvites.length})</CardTitle>
        </CardHeader>

        <CardContent>
          {data.pendingInvites.length === 0 ? (
            <p className="text-sm text-muted-foreground">No pending invitations.</p>
          ) : (
            <div className="space-y-4">
              {data.pendingInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{invite.email}</p>

                    <p className="text-sm text-muted-foreground">
                      Sent on {invite.createdAt.toLocaleDateString()}
                    </p>
                  </div>

                  <span className="text-sm text-muted-foreground">
                    Expires {invite.expiresAt.toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
