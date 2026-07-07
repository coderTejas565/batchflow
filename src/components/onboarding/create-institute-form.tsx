"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createInstituteSchema,
  type CreateInstituteInput,
} from "@/modules/institute/institute.validation";

import { createInstituteAction } from "@/modules/institute/institute.actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/shared/submit-button";

export function CreateInstituteForm() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateInstituteInput>({
    resolver: zodResolver(createInstituteSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: CreateInstituteInput) => {
    startTransition(async () => {
      const result = await createInstituteAction(values);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      const institute = result.data;

      form.reset();

      toast.success("Institute created successfully!");

      router.replace(`/app/${institute.slug}`);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institute Name</FormLabel>

              <FormControl>
                <Input placeholder="e.g. Adarash Academy" autoComplete="organization" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton loading={isPending} loadingText="Creating Institute...">
          Create Institute
        </SubmitButton>
      </form>
    </Form>
  );
}
