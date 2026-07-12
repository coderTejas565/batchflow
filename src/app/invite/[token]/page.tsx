import { getSession } from "@/lib/auth/session";
import { loadInvite } from "@/modules/teacher";

import { InviteCard } from "@/components/invite/invite-card";

type InvitePageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function InvitePage({ params }: InvitePageProps) {
  const { token } = await params;

  const [invite, session] = await Promise.all([loadInvite(token), getSession()]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <InviteCard invite={invite} isAuthenticated={!!session} />
    </main>
  );
}
