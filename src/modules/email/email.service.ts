import { teacherInviteTemplate } from "./email.templates";

type SendTeacherInviteEmailParams = {
  to: string;
  instituteName: string;
  inviteLink: string;
};

export async function sendTeacherInviteEmail({
  to,
  instituteName,
  inviteLink,
}: SendTeacherInviteEmailParams) {
  const email = teacherInviteTemplate({
    instituteName,
    inviteLink,
  });

  console.log("====================================");
  console.log("Teacher Invite Email");
  console.log("To:", to);
  console.log("Subject:", email.subject);
  console.log(email.text);
  console.log("====================================");
}
