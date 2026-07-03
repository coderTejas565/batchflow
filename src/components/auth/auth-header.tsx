import Link from "next/link";

interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({
  title,
  description,
}: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center space-y-4 text-center">
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
          B
        </div>

        <span className="text-xl font-bold tracking-tight">
          BatchFlow
        </span>
      </Link>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">
          {title}
        </h1>

        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}