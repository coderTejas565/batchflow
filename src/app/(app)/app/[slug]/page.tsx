type WorkspacePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { slug } = await params;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{slug}</h1>

      <p className="mt-2 text-muted-foreground">Welcome to your institute dashboard.</p>
    </main>
  );
}
