import { pgTable, text, timestamp, uniqueIndex, index, pgEnum } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const instituteRoleEnum = pgEnum("institute_role", ["owner", "teacher", "student"]);

export const teacherInviteStatusEnum = pgEnum("teacher_invite_status", [
  "pending",
  "accepted",
  "expired",
  "cancelled",
]);

export const institute = pgTable(
  "institute",
  {
    id: text("id").primaryKey(),

    name: text("name").notNull(),

    slug: text("slug").notNull().unique(),

    logo: text("logo"),

    createdBy: text("owner_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
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
    uniqueIndex("institute_slug_unique").on(table.slug),
    index("institute_owner_idx").on(table.createdBy),
  ],
);

export const instituteMember = pgTable(
  "institute_member",
  {
    id: text("id").primaryKey(),

    instituteId: text("institute_id")
      .notNull()
      .references(() => institute.id, {
        onDelete: "cascade",
      }),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    role: instituteRoleEnum("role").notNull(),

    joinedAt: timestamp("joined_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("member_user_idx").on(table.userId),
    index("member_institute_idx").on(table.instituteId),

    uniqueIndex("member_unique").on(table.userId, table.instituteId),
  ],
);

export const teacherInvite = pgTable(
  "teacher_invite",
  {
    id: text("id").primaryKey(),

    instituteId: text("institute_id")
      .notNull()
      .references(() => institute.id, {
        onDelete: "cascade",
      }),

    email: text("email").notNull(),

    token: text("token").notNull().unique(),

    status: teacherInviteStatusEnum("status").default("pending").notNull(),

    invitedBy: text("invited_by")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    expiresAt: timestamp("expires_at", {
      withTimezone: true,
    }).notNull(),

    acceptedAt: timestamp("accepted_at", {
      withTimezone: true,
    }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("teacher_invite_email_idx").on(table.email),
    index("teacher_invite_institute_idx").on(table.instituteId),
  ],
);
