"use client";

import { Button } from "@/components/ui/button";

type BatchActionsProps = {
  canManage: boolean;
};

export function BatchActions({ canManage }: BatchActionsProps) {
  if (!canManage) {
    return null;
  }

  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline">Edit Batch</Button>

      <Button variant="destructive">Archive Batch</Button>
    </div>
  );
}
