"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { createBatchAction } from "@/modules/batch/batch.actions";

import type { CreateBatchFormValues, TeacherOptionDTO } from "@/modules/batch/batch.types";

import { createBatchFormSchema } from "@/modules/batch";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { BatchFields } from "./batch-fields";

type BatchFormProps = {
  slug: string;
  teachers: TeacherOptionDTO[];
  onSuccess: () => void;
};

export function BatchForm({ slug, teachers, onSuccess }: BatchFormProps) {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  const form = useForm<CreateBatchFormValues>({
    resolver: zodResolver(createBatchFormSchema),

    defaultValues: {
      name: "",
      description: "",
      teacherId: "",
      startDate: "",
      endDate: "",
    },
  });

  function onSubmit(values: CreateBatchFormValues) {
    startTransition(async () => {
      const result = await createBatchAction({
        slug,

        ...values,
      });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Batch created successfully.");

      form.reset();

      onSuccess();

      router.refresh();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BatchFields control={form.control} teachers={teachers} />

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Creating..." : "Create Batch"}
        </Button>
      </form>
    </Form>
  );
}
