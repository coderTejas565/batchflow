"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { acceptTeacherInviteAction } from "@/modules/teacher/teacher.actions";

type Props = {
  token: string;
};

export function AcceptInviteButton({ token }: Props) {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  function handleAccept() {
    startTransition(async () => {
      const result = await acceptTeacherInviteAction({
        token,
      });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Invitation accepted successfully!");

      router.replace(`/app/${result.data.instituteSlug}`);
    });
  }

  return (
    <Button onClick={handleAccept} disabled={pending} className="w-full">
      {pending ? "Accepting..." : "Accept Invitation"}
    </Button>
  );
}
