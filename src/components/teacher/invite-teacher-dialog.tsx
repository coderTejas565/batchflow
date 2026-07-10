"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { inviteTeacherSchema, type InviteTeacherInput } from "@/modules/teacher/teacher.validation";

import { inviteTeacherAction } from "@/modules/teacher/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

type InviteTeacherDialogProps = {
  slug: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function InviteTeacherDialog({ 
  slug, open, onOpenChange }: InviteTeacherDialogProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<InviteTeacherInput>({
    resolver: zodResolver(inviteTeacherSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: InviteTeacherInput) => {
    startTransition(async () => {
      const result = await inviteTeacherAction({
        slug,
        email: values.email,
      });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Invitation sent successfully.");

      form.reset();

      onOpenChange(false);

      router.refresh();
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Teacher</DialogTitle>

          <DialogDescription>
            Enter the teacher&apos;s email address. They&apos;ll receive an invitation to join your
            institute.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <Input placeholder="teacher@example.com" autoComplete="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton loading={isPending} loadingText="Sending...">
              Send Invitation
            </SubmitButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
