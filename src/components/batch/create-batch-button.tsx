"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { CreateBatchDialog } from "./create-batch-dialog";

import type { TeacherOptionDTO } from "@/modules/batch";

type CreateBatchButtonProps = {
  slug: string;
  teachers: TeacherOptionDTO[];
};

export function CreateBatchButton({ slug, teachers }: CreateBatchButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create Batch</Button>

      <CreateBatchDialog open={open} onOpenChange={setOpen} slug={slug} teachers={teachers} />
    </>
  );
}
