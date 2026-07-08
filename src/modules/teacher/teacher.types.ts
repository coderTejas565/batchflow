export type TeacherDTO = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  joinedAt: Date;
};

export type TeacherInviteDTO = {
  id: string;
  email: string;
  status: "pending" | "accepted" | "expired" | "cancelled";
  expiresAt: Date;
  createdAt: Date;
};

export type TeacherPageDTO = {
  teachers: TeacherDTO[];
  pendingInvites: TeacherInviteDTO[];
};
