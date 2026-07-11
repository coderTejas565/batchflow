import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { AcceptInviteButton } from "./accept-invite-button";

import type { TeacherInviteDetailsDTO } from "@/modules/teacher";

type InviteCardProps = {
  invite: TeacherInviteDetailsDTO;
};

export function InviteCard({ invite }: InviteCardProps) {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-2">
        <AcceptInviteButton token={invite.token} />

        <CardDescription>
          You&apos;re invited to join <span className="font-medium">{invite.institute.name}</span>{" "}
          as a teacher.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2 rounded-lg border bg-muted/40 p-4">
          <div>
            <p className="text-sm font-medium">Institute</p>
            <p className="text-sm text-muted-foreground">{invite.institute.name}</p>
          </div>

          <div>
            <p className="text-sm font-medium">Invitation sent to</p>
            <p className="text-sm text-muted-foreground">{invite.email}</p>
          </div>

          <div>
            <p className="text-sm font-medium">Expires</p>
            <p className="text-sm text-muted-foreground">{invite.expiresAt.toLocaleDateString()}</p>
          </div>
        </div>

        <Button className="w-full">Accept Invitation</Button>
      </CardContent>
    </Card>
  );
}
