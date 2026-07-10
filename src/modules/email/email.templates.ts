type TeacherInviteTemplateParams = {
  instituteName: string;
  inviteLink: string;
};

export function teacherInviteTemplate({ instituteName, inviteLink }: TeacherInviteTemplateParams) {
  return {
    subject: `You're invited to join ${instituteName}`,

    text: `
You've been invited to join ${instituteName} as a teacher.

Accept your invitation:

${inviteLink}

This invitation expires in 7 days.
`,
  };
}
