"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authClient } from "@/lib/auth-client";
import {
  signupSchema,
  type SignupFormValues,
} from "@/lib/validations/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { SignupFields } from "./signup-fields";

interface SignupFormProps {
  role: "teacher" | "student";
}

export function SignupForm({ role }: SignupFormProps) {
  const router = useRouter();
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
      role, // 👈 teacher or student
    });

    setIsLoading(false);

    if (error) {
      // Later we'll show a toast
      console.error(error);
      return;
    }

    router.push(
      role === "teacher"
        ? "/teacher/dashboard"
        : "/student/dashboard"
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <SignupFields control={form.control} />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </Form>
  );
}