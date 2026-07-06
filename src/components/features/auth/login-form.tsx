"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authClient } from "@/lib/auth-client";
import {
  loginSchema,
  type LoginFormValues,
} from "@/lib/validations/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { LoginFields } from "./login-fields";

export function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (error) {
      // TODO: Show toast
      console.error(error);
      return;
    }

    router.push("/app");
    router.refresh();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <LoginFields control={form.control} />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? "Signing in..."
            : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}