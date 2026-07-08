import { getCurrentWorkspace } from "@/modules/workspace";

import { WorkspaceSidebar } from "@/components/workspace/workspace-sidebar";
import { WorkspaceTopbar } from "@/components/workspace/workspace-topbar";

type WorkspaceLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
};

export default async function WorkspaceLayout({
  children,
  params,
}: WorkspaceLayoutProps) {
  const { slug } = await params;

  const workspace = await getCurrentWorkspace(slug);

  return (
    <div className="flex min-h-screen">
      <WorkspaceSidebar workspace={workspace} />

      <div className="flex flex-1 flex-col">
        <WorkspaceTopbar workspace={workspace} />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}