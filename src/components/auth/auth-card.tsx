import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <Card
      className={cn("w-full max-w-md rounded-2xl border shadow-lg backdrop-blur-sm", className)}
    >
      <CardContent className="space-y-8 p-8">{children}</CardContent>
    </Card>
  );
}
