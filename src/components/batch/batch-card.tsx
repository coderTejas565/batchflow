"use client";

import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { BatchDTO } from "@/modules/batch";

type BatchCardProps = {
  batch: BatchDTO;
};

export function BatchCard({ batch }: BatchCardProps) {
  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>{batch.name}</CardTitle>

            {batch.description && (
              <CardDescription className="mt-1">{batch.description}</CardDescription>
            )}
          </div>

          <Badge variant="secondary">{batch.status}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium">Teacher</p>

          <p className="text-sm text-muted-foreground">{batch.teacher.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Starts</p>

            <p className="text-sm text-muted-foreground">
              {batch.startDate
  ? format(batch.startDate, "dd MMM yyyy")
  : "Not set"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium">Ends</p>

            <p className="text-sm text-muted-foreground">{batch.endDate
  ? format(batch.endDate, "dd MMM yyyy")
  : "Not set"}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm">
          View
        </Button>

        <Button size="sm">Edit</Button>
      </CardFooter>
    </Card>
  );
}
