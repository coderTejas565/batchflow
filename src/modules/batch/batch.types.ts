export type BatchStatus = "active" | "completed" | "archived";

export type BatchDTO = {
  id: string;

  name: string;
  description: string | null;

  status: BatchStatus;

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
  description?: string | null;

  teacherId: string;

  startDate?: Date | null;
  endDate?: Date | null;
};

export type UpdateBatchInput = {
  batchId: string;

  name: string;
  description?: string | null;

  teacherId: string;

  status: BatchStatus;

  startDate?: Date | null;
  endDate?: Date | null;
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

export type CreateBatchFormValues = {
  name: string;
  description?: string;
  teacherId: string;
  startDate?: string;
  endDate?: string;
};