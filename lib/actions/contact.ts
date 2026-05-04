"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactPayload {
    enquiry: string;
    name: string;
    email: string;
    phone: string;
    message: string;
}

function buildEmailHtml(data: ContactPayload): string {
    const { enquiry, name, email, phone, message } = data;
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f2f3fa;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f3fa;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#0E82DF;padding:32px 36px;">
            <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#d4af37;">
              Lumina Neuro-Literacy Studio
            </p>
            <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#f8fafc;">
              New ${enquiry}
            </h1>
            <p style="margin:6px 0 0;font-size:14px;color:rgba(248,250,252,0.7);">
              from ${name}
            </p>
          </td>
        </tr>

        <!-- Detail rows -->
        <tr>
          <td style="background:#ffffff;padding:28px 36px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${[
                  ["Enquiry type", enquiry],
                  ["Name", name],
                  ["Email", email],
                  ["Phone", phone || "—"],
              ]
                  .map(
                      ([label, value]) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f2f3fa;width:130px;">
                  <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#475467;">${label}</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f2f3fa;">
                  <span style="font-size:14px;color:#111827;">${value}</span>
                </td>
              </tr>`
                  )
                  .join("")}
            </table>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="background:#ffffff;padding:24px 36px 32px;">
            <p style="margin:0 0 10px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#475467;">
              Message
            </p>
            <div style="background:#f2f3fa;border-radius:10px;padding:18px 20px;">
              <p style="margin:0;font-size:14px;line-height:1.75;color:#111827;white-space:pre-wrap;">${message}</p>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;border-top:1px solid #e5e7eb;padding:20px 36px;border-radius:0 0 16px 16px;">
            <p style="margin:0;font-size:13px;color:#475467;">
              Reply directly to this email to respond to <strong>${name}</strong>.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function submitContactForm(
    data: ContactPayload
): Promise<{ error: string | null }> {
    const { error } = await resend.emails.send({
        from: "Lumina Contact Form <no-reply@lumina-literacy.ie>",
        to: "info@lumina-literacy.ie",
        replyTo: data.email,
        subject: `New ${data.enquiry} from ${data.name}`,
        html: buildEmailHtml(data),
    });

    return { error: error?.message ?? null };
}
