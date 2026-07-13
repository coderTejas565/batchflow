import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { BatchDetailsDTO } from "@/modules/batch";

import { BatchActions } from "./batch-actions";
import { BatchMetadata } from "./batch-metadata";
import { BatchStatusBadge } from "./batch-status-badge";

type BatchDetailsCardProps = {
  batch: BatchDetailsDTO;
  canManage: boolean;
};

export function BatchDetailsCard({
  batch,
  canManage,
}: BatchDetailsCardProps) {
  return (
    <Card className="max-w-3xl">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>{batch.name}</CardTitle>

            {batch.description && (
              <CardDescription>
                {batch.description}
              </CardDescription>
            )}
          </div>

          <BatchStatusBadge
            status={batch.status}
          />
        </div>
      </CardHeader>

      <CardContent>
        <BatchMetadata batch={batch} />
      </CardContent>

      {canManage && (
        <CardFooter>
          <BatchActions
            canManage={canManage}
          />
        </CardFooter>
      )}
    </Card>
  );
}