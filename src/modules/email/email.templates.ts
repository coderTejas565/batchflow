type TeacherInviteTemplateParams = {
  instituteName: string;
  inviteLink: string;
};

export function teacherInviteTemplate({ instituteName, inviteLink }: TeacherInviteTemplateParams) {
  const subject = `You're invited to join ${instituteName}`;

  const text = `
You've been invited to join ${instituteName} as a teacher.

Accept your invitation:
${inviteLink}

This invitation expires in 7 days.
`;

  const html = `
<div style="background:#f8fafc;padding:40px 20px;">
  <div style="max-width:600px;margin:auto;background:white;border-radius:12px;padding:40px;font-family:Arial,sans-serif;border:1px solid #e5e7eb;">

    <h1 style="margin:0 0 16px;font-size:24px;">
      BatchFlow
    </h1>

    <h2 style="margin-bottom:12px;">
      Teacher Invitation
    </h2>

    <p style="line-height:1.6;color:#374151;">
      You've been invited to join
      <strong>${instituteName}</strong>
      as a teacher.
    </p>

    <p style="line-height:1.6;color:#374151;">
      Click the button below to accept your invitation.
    </p>

    <div style="margin:32px 0;">
      <a
        href="${inviteLink}"
        style="
          background:#2563eb;
          color:white;
          padding:14px 24px;
          border-radius:8px;
          text-decoration:none;
          font-weight:600;
          display:inline-block;
        "
      >
        Accept Invitation
      </a>
    </div>

    <p style="font-size:14px;color:#6b7280;">
      This invitation expires in <strong>7 days</strong>.
    </p>

    <hr style="margin:32px 0;border:none;border-top:1px solid #e5e7eb;" />

    <p style="font-size:13px;color:#6b7280;">
      If the button doesn't work, copy and paste this link into your browser:
    </p>

    <p style="word-break:break-all;font-size:13px;">
      <a href="${inviteLink}">
        ${inviteLink}
      </a>
    </p>

  </div>
</div>
`;

  return {
    subject,
    text,
    html,
  };
}
