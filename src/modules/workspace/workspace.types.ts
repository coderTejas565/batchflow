export type WorkspaceDTO = {
  institute: {
    id: string;
    name: string;
    slug: string;
    logo: string | null;
  };

  membership: {
    role: "owner" | "teacher" | "student";
    joinedAt: Date;
  };

  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
};
