import { notFound } from "next/navigation";

import {
  getBatchPageAction,
} from "@/modules/batch";

import {
  getCurrentWorkspace,
} from "@/modules/workspace";

import { CreateBatchButton } from "@/components/batch/create-batch-button";
import { BatchList } from "@/components/batch/batch-list";

export default async function BatchesPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const workspace =
    await getCurrentWorkspace(slug);

  const result =
    await getBatchPageAction(
      workspace.institute.id,
    );

  if (!result.success) {
    notFound();
  }

  const {
    batches,
    teachers,
  } = result.data;

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Batches
          </h1>

          <p className="text-muted-foreground">
            Manage your institute batches.
          </p>
        </div>

        {workspace.membership.role ===
          "owner" && (
          <CreateBatchButton
            slug={slug}
            teachers={teachers}
          />
        )}
      </div>

      <BatchList batches={batches} />

    </div>
  );
}