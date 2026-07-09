"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { InviteTeacherDialog } from "./invite-teacher-dialog";

type InviteTeacherButtonProps = {
  instituteId: string;
};

export function InviteTeacherButton({
  instituteId,
}: InviteTeacherButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Invite Teacher
      </Button>

      <InviteTeacherDialog
        instituteId={instituteId}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}