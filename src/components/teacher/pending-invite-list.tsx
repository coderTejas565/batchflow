import type { TeacherInviteDTO } from "@/modules/teacher";

import { PendingInviteCard } from "./pending-invite-card";

type PendingInviteListProps = {
  invites: TeacherInviteDTO[];
};

export function PendingInviteList({ invites }: PendingInviteListProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Pending Invitations</h2>

        <p className="text-sm text-muted-foreground">
          Invitations that have been sent but not been accepted yet.
        </p>
      </div>

      {invites.length === 0 ? (
        <div className="rounded-lg border border-dashed py-12 text-center">
          <p className="font-medium">No pending invitations</p>

          <p className="mt-2 text-sm text-muted-foreground">
            Invite teachers to collaborate with your institute.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {invites.map((invite) => (
            <PendingInviteCard key={invite.id} invite={invite} />
          ))}
        </div>
      )}
    </section>
  );
}
