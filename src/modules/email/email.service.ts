import { resend } from "./resend";
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

  try {
    const { error } = await resend.emails.send({
      from: "BatchFlow <onboarding@resend.dev>",
      to,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Failed to send teacher invitation email:", error);
  }
}
