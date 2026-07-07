"use client";

import { Control } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/features/auth/password-input";

import { LoginFormValues } from "@/lib/validations/auth";

interface LoginFieldsProps {
  control: Control<LoginFormValues>;
}

export function LoginFields({ control }: LoginFieldsProps) {
  return (
    <div className="space-y-5">
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>

            <FormControl>
              <Input type="email" placeholder="john@example.com" autoComplete="email" {...field} />
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
                autoComplete="current-password"
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
