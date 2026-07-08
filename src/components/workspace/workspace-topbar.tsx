import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import type { WorkspaceDTO } from "@/modules/workspace";

type WorkspaceTopbarProps = {
  workspace: WorkspaceDTO;
};

export function WorkspaceTopbar({ workspace }: WorkspaceTopbarProps) {
  const initials = workspace.user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h1 className="text-lg font-semibold">{workspace.institute.name}</h1>

        <p className="text-sm text-muted-foreground capitalize">{workspace.membership.role}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium">{workspace.user.name}</p>

          <p className="text-xs text-muted-foreground">{workspace.user.email}</p>
        </div>

        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
