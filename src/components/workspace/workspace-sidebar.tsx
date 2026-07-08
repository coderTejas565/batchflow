import Link from "next/link";
import { Building2, GraduationCap, LayoutDashboard, Settings, Users } from "lucide-react";

import type { WorkspaceDTO } from "@/modules/workspace";

type WorkspaceSidebarProps = {
  workspace: WorkspaceDTO;
};

const navigation = [
  {
    name: "Dashboard",
    href: "",
    icon: LayoutDashboard,
  },
  {
    name: "Teachers",
    href: "/teachers",
    icon: Users,
  },
  {
    name: "Students",
    href: "/students",
    icon: GraduationCap,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function WorkspaceSidebar({ workspace }: WorkspaceSidebarProps) {
  return (
    <aside className="flex w-72 flex-col border-r bg-background">
      <div className="border-b p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
            <Building2 className="size-5 text-primary" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate font-semibold">{workspace.institute.name}</h2>

            <p className="text-sm text-muted-foreground capitalize">{workspace.membership.role}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={`/app/${workspace.institute.slug}${item.href}`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon className="size-4" />

              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
