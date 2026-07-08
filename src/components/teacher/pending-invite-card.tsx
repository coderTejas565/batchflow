import type { TeacherInviteDTO } from "@/modules/teacher";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type PendingInviteCardProps = {
  invite: TeacherInviteDTO;
};

export function PendingInviteCard({
  invite,
}: PendingInviteCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between py-5">
        <div className="space-y-1">
          <h3 className="font-medium">
            {invite.email}
          </h3>

          <p className="text-sm text-muted-foreground">
            Sent on{" "}
            {invite.createdAt.toLocaleDateString()}
          </p>

          <p className="text-xs text-muted-foreground">
            Expires on{" "}
            {invite.expiresAt.toLocaleDateString()}
          </p>
        </div>

        <Badge variant="secondary">
          Pending
        </Badge>
      </CardContent>
    </Card>
  );
}