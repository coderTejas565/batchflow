"use client";

import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/auth/password-input";

import { SignupFormValues } from "@/lib/validations/auth";

interface SignupFieldsProps {
  control: Control<SignupFormValues>;
}

export function SignupFields({ control }: SignupFieldsProps) {
  return (
    <div className="space-y-5">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>

            <FormControl>
              <Input
                placeholder="John Doe"
                autoComplete="name"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>

            <FormControl>
              <Input
                type="email"
                placeholder="john@example.com"
                autoComplete="email"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>

            <FormControl>
              <PasswordInput
                placeholder="Enter your password"
                autoComplete="new-password"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>

            <FormControl>
              <PasswordInput
                placeholder="Confirm your password"
                autoComplete="new-password"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}