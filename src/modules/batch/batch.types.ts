export type BatchDTO = {
  id: string;
  name: string;
  description: string | null;

  status: "active" | "completed" | "archived";

  startDate: Date | null;
  endDate: Date | null;

  teacher: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };

  createdAt: Date;
};


export type CreateBatchInput = {
  name: string;
  description?: string;
  teacherId: string;
  startDate?: Date;
  endDate?: Date;
};

export type UpdateBatchInput = {
  batchId: string;
  name: string;
  description?: string;
  teacherId: string;
  status: "active" | "completed" | "archived";
  startDate?: Date;
  endDate?: Date;
};

export type TeacherOptionDTO = {
  id: string;
  name: string;
  email: string;
};

export type BatchPageDTO = {
  batches: BatchDTO[];
  teachers: TeacherOptionDTO[];
};