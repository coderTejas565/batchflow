export type BatchStatus = "active" | "completed" | "archived";

//
// DTOs
//

export type BatchDTO = {
  id: string;

  name: string;
  description: string | null;

  status: BatchStatus;

  startDate: Date | null;
  endDate: Date | null;

  createdAt: Date;

  teacher: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
};

export type BatchDetailsDTO = {
  id: string;

  name: string;
  description: string | null;

  status: BatchStatus;

  startDate: Date | null;
  endDate: Date | null;

  createdAt: Date;

  teacher: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };

  studentCount: number;
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

//
// Form Types (React Hook Form)
//

export type CreateBatchFormValues = {
  name: string;
  description?: string;

  teacherId: string;

  startDate?: string;
  endDate?: string;
};

//
// Service Types
//

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

// for loader
export type BatchPageData = {
  batches: BatchDTO[];
  teachers: TeacherOptionDTO[];

  permissions: {
    canCreate: boolean;
    canEdit: boolean;
    canArchive: boolean;
  };
};
