import Link from "next/link";

interface AuthFooterProps {
  text: string;
  linkText: string;
  href: string;
}

export function AuthFooter({
  text,
  linkText,
  href,
}: AuthFooterProps) {
  return (
    <div className="text-center text-sm text-muted-foreground">
      <span>{text} </span>

      <Link
        href={href}
        className="font-medium text-primary transition-colors hover:underline underline-offset-4"
      >
        {linkText}
      </Link>
    </div>
  );
}