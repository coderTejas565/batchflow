import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/session";
import { getUserInstitutes } from "@/modules/institute/institute.service";

export default async function AppPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const institutes = await getUserInstitutes(session.user.id);

  if (institutes.length === 0) {
    redirect("/app/onboarding");
  }

  redirect(`/app/${institutes[0].slug}`);
}
