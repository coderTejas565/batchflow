export type TeacherDTO = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  joinedAt: Date;
  role: "owner" | "teacher" | "student";
};

export type TeacherInviteDTO = {
  id: string;
  email: string;
  status: "pending" | "accepted" | "expired" | "cancelled";
  expiresAt: Date;
  createdAt: Date;

  invitedBy: {
    id: string;
    name: string;
  };
};

export type TeacherPageDTO = {
  teachers: TeacherDTO[];
  pendingInvites: TeacherInviteDTO[];
};

export type InviteTeacherInput = {
  email: string;
};