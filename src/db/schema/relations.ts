import { relations } from "drizzle-orm";

import { user, session, account } from "./auth";

import {
  institute,
  instituteMember,
  teacherInvite,
} from "./institute";


export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),

  instituteMemberships: many(instituteMember),

  teacherInvitesSent: many(teacherInvite),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const instituteRelations = relations(
  institute,
  ({ one, many }) => ({
    owner: one(user, {
      fields: [institute.createdBy],
      references: [user.id],
    }),

    members: many(instituteMember),
  })
);

export const instituteMemberRelations = relations(
  instituteMember,
  ({ one }) => ({
    user: one(user, {
      fields: [instituteMember.userId],
      references: [user.id],
    }),

    institute: one(institute, {
      fields: [instituteMember.instituteId],
      references: [institute.id],
    }),
  })
);

export const teacherInviteRelations = relations(
  teacherInvite,
  ({ one }) => ({
    institute: one(institute, {
      fields: [teacherInvite.instituteId],
      references: [institute.id],
    }),

    inviter: one(user, {
      fields: [teacherInvite.invitedBy],
      references: [user.id],
    }),
  })
);