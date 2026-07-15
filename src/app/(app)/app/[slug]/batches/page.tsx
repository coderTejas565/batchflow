import { getCurrentWorkspace } from "@/modules/workspace";
import { getBatchPage } from "@/modules/batch/batch.service";

import { BatchList } from "@/components/batch/batch-list";
import { CreateBatchButton } from "@/components/batch/create-batch-button";

type BatchesPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BatchesPage({ params }: BatchesPageProps) {
  const { slug } = await params;

  const workspaceContext = await getCurrentWorkspace(slug);

  const { batches, teachers } = await getBatchPage(workspaceContext.institute.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Batches</h1>

          <p className="text-muted-foreground">Manage institute batches</p>
        </div>

        {workspaceContext.membership.role === "owner" && (
          <CreateBatchButton slug={slug} teachers={teachers} />
        )}
      </div>

      <BatchList slug={slug} batches={batches} />
    </div>
  );
}
