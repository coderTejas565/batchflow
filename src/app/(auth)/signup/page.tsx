import { AuthCard } from "@/components/features/auth/auth-card";
import { AuthFooter } from "@/components/features/auth/auth-footer";
import { AuthHeader } from "@/components/features/auth/auth-header";
import { SignupForm } from "@/components/features/auth/signup-form";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <AuthCard>
        <AuthHeader
          title="Create your account"
          description="Sign up to start managing your institute with BatchFlow."
        />

        <SignupForm />

        <AuthFooter
          text="Already have an account?"
          linkText="Sign In"
          href="/login"
        />
      </AuthCard>
    </main>
  );
}