"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authClient } from "@/lib/auth/auth-client";
import { signupSchema, type SignupFormValues } from "@/lib/validations/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { SignupFields } from "./signup-fields";

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callback = searchParams.get("callback") ?? "/app";

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignupFormValues) {
    setIsLoading(true);

    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    setIsLoading(false);

    if (error) {
      // TODO: Show toast
      console.error(error);
      return;
    }

    router.push(callback);
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <SignupFields control={form.control} />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
