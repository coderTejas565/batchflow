import { AuthCard } from "@/components/features/auth/auth-card";
import { AuthFooter } from "@/components/features/auth/auth-footer";
import { AuthHeader } from "@/components/features/auth/auth-header";
import { LoginForm } from "@/components/features/auth/login-form";

type LoginPageProps = {
  searchParams: Promise<{
    callback?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { callback } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <AuthCard>
        <AuthHeader
          title="Welcome back"
          description="Sign in to continue to your BatchFlow workspace."
        />

        <LoginForm />

        <AuthFooter
          text="Don't have an account?"
          linkText="Create one"
          href={callback ? `/signup?callback=${encodeURIComponent(callback)}` : "/signup"}
        />
      </AuthCard>
    </main>
  );
}
