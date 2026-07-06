import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";
import { instituteService } from "@/services/institute.service";

export default async function AppPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const institutes = await instituteService.getUserInstitutes(
    session.user.id
  );

  if (institutes.length === 0) {
    redirect("/onboarding");
  }

  redirect("/dashboard");
}