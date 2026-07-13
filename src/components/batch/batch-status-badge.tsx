import { Badge } from "@/components/ui/badge";

import type { BatchDetailsDTO } from "@/modules/batch";

type BatchStatusBadgeProps = {
  status: BatchDetailsDTO["status"];
};

const statusConfig: Record<
  BatchDetailsDTO["status"],
  {
    label: string;
    variant: "default" | "secondary" | "outline";
  }
> = {
  active: {
    label: "Active",
    variant: "default",
  },

  completed: {
    label: "Completed",
    variant: "secondary",
  },

  archived: {
    label: "Archived",
    variant: "outline",
  },
};

export function BatchStatusBadge({
  status,
}: BatchStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
}