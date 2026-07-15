import { BatchCard } from "./batch-card";

import type { BatchDTO } from "@/modules/batch";

type BatchListProps = {
  slug: string;
  batches: BatchDTO[];
};

export function BatchList({ slug, batches }: BatchListProps) {
  if (batches.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">No batches found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {batches.map((batch) => (
        <BatchCard key={batch.id} slug={slug} batch={batch} />
      ))}
    </div>
  );
}
