import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { AcceptInviteButton } from "./accept-invite-button";

import type { TeacherInviteDetailsDTO } from "@/modules/teacher";

import Link from "next/link";

type InviteCardProps = {
  invite: TeacherInviteDetailsDTO;
  isAuthenticated: boolean;
};

export function InviteCard({ invite, isAuthenticated }: InviteCardProps) {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle>Teacher Invitation</CardTitle>

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

        {isAuthenticated ? (
          <AcceptInviteButton token={invite.token} />
        ) : (
          <Button asChild className="w-full">
            <Link href={`/login?callback=/invite/${invite.token}`}>Login to Accept</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
