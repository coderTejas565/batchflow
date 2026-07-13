import { pgTable, pgEnum, text, timestamp, index } from "drizzle-orm/pg-core";

import { institute } from "./institute";
import { user } from "./auth";

export const batchStatusEnum = pgEnum("batch_status", ["active", "completed", "archived"]);

export const batch = pgTable(
  "batch",
  {
    id: text("id").primaryKey(),

    instituteId: text("institute_id")
      .notNull()
      .references(() => institute.id, {
        onDelete: "cascade",
      }),

    teacherId: text("teacher_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "restrict",
      }),

    createdBy: text("created_by")
      .notNull()
      .references(() => user.id, {
        onDelete: "restrict",
      }),

    name: text("name").notNull(),

    description: text("description"),

    status: batchStatusEnum("status").default("active").notNull(),

    startDate: timestamp("start_date", {
      withTimezone: true,
    }),

    endDate: timestamp("end_date", {
      withTimezone: true,
    }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("batch_institute_idx").on(table.instituteId),

    index("batch_teacher_idx").on(table.teacherId),

    index("batch_created_by_idx").on(table.createdBy),

    index("batch_status_idx").on(table.status),
  ],
);
