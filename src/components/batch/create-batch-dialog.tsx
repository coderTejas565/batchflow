"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { BatchForm } from "./batch-form";

import type { TeacherOptionDTO } from "@/modules/batch";

type CreateBatchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slug: string;
  teachers: TeacherOptionDTO[];
};

export function CreateBatchDialog({ open, onOpenChange, slug, teachers }: CreateBatchDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Batch</DialogTitle>

          <DialogDescription>Create a new batch and assign a teacher.</DialogDescription>
        </DialogHeader>

        <BatchForm slug={slug} teachers={teachers} onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
