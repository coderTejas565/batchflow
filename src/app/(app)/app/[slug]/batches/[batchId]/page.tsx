import { notFound } from "next/navigation";

import { getCurrentWorkspace } from "@/modules/workspace";
import { getBatchDetailsAction } from "@/modules/batch";

import { BatchDetailsCard } from "@/components/batch/batch-details-card";

type BatchPageProps = {
  params: Promise<{
    slug: string;
    batchId: string;
  }>;
};

export default async function BatchPage({
  params,
}: BatchPageProps) {
  const { slug, batchId } = await params;

  const workspace = await getCurrentWorkspace(slug);

  const result = await getBatchDetailsAction({
    slug,
    batchId,
  });

  if (!result.success) {
    notFound();
  }

  const canManage =
    workspace.membership.role === "owner";

  return (
    <div className="space-y-6">
      <BatchDetailsCard
        batch={result.data}
        canManage={canManage}
      />
    </div>
  );
}