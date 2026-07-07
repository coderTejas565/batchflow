import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/session";
import { getUserInstitutes } from "@/modules/institute/institute.service";

import { CreateInstituteCard } from "@/components/onboarding/create-institute-card";

export default async function OnboardingPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const institutes = await getUserInstitutes(session.user.id);

  if (institutes.length > 0) {
    redirect(`/app/${institutes[0].slug}`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <CreateInstituteCard />
    </main>
  );
}