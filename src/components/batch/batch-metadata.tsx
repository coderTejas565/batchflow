import { format } from "date-fns";

import type { BatchDetailsDTO } from "@/modules/batch";

type BatchMetadataProps = {
  batch: BatchDetailsDTO;
};

export function BatchMetadata({ batch }: BatchMetadataProps) {
  const items = [
    {
      label: "Teacher",
      value: batch.teacher.name,
    },
    {
      label: "Students",
      value: batch.studentCount.toString(),
    },
    {
      label: "Start Date",
      value: batch.startDate ? format(batch.startDate, "dd MMM yyyy") : "Not set",
    },
    {
      label: "End Date",
      value: batch.endDate ? format(batch.endDate, "dd MMM yyyy") : "Not set",
    },
    {
      label: "Created",
      value: format(batch.createdAt, "dd MMM yyyy"),
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label}>
          <p className="text-sm font-medium">{item.label}</p>

          <p className="text-sm text-muted-foreground">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
