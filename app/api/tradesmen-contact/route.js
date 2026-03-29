import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { name, phone, trade, email, message } = await req.json();

  try {
    await resend.emails.send({
      from: "MunroStudio <onboarding@resend.dev>",
      to: "euanmunroo@gmail.com",
      subject: `New enquiry from ${name} — ${trade}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background-color:#f5f4f0;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f4f0;padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
  <tr><td style="background-color:#0a0a0a;padding:28px 40px;border-radius:16px 16px 0 0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td><span style="font-family:Georgia,serif;font-size:20px;font-weight:700;color:#ffffff;">Munro<em style="color:#2563eb;font-style:italic;">Studio</em></span></td>
      <td align="right"><span style="font-family:Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.35);letter-spacing:2px;text-transform:uppercase;">New Enquiry</span></td>
    </tr></table>
  </td></tr>
  <tr><td style="background-color:#0a0a0a;padding:0 40px 36px 40px;">
    <p style="margin:0 0 4px 0;font-family:Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.35);letter-spacing:2px;text-transform:uppercase;">You've got a lead</p>
    <h1 style="margin:0;font-family:Georgia,serif;font-size:42px;font-weight:900;color:#ffffff;line-height:1.1;letter-spacing:-1px;">Get found on Google.<br/><em style="color:#2563eb;font-style:italic;">Win more jobs.</em></h1>
  </td></tr>
  <tr><td style="background-color:#ffffff;padding:40px;border-radius:0 0 16px 16px;">
    <p style="margin:0 0 28px 0;font-family:Arial,sans-serif;font-size:14px;color:#6b7280;line-height:1.6;">Someone filled out the contact form on your tradesmen landing page. Here are their details:</p>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <tr>
        <td style="padding:14px 20px;background-color:#f9fafb;border-bottom:1px solid #e5e7eb;"><span style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:1.5px;text-transform:uppercase;">Name</span></td>
        <td style="padding:14px 20px;background-color:#f9fafb;border-bottom:1px solid #e5e7eb;"><span style="font-family:Georgia,serif;font-size:15px;font-weight:700;color:#0a0a0a;">${name}</span></td>
      </tr>
      <tr>
        <td style="padding:14px 20px;border-bottom:1px solid #e5e7eb;"><span style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:1.5px;text-transform:uppercase;">Trade</span></td>
        <td style="padding:14px 20px;border-bottom:1px solid #e5e7eb;"><span style="font-family:Arial,sans-serif;font-size:14px;color:#111827;">${trade}</span></td>
      </tr>
      <tr>
        <td style="padding:14px 20px;background-color:#f9fafb;border-bottom:1px solid #e5e7eb;"><span style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:1.5px;text-transform:uppercase;">Email</span></td>
        <td style="padding:14px 20px;background-color:#f9fafb;border-bottom:1px solid #e5e7eb;"><a href="mailto:${email}" style="font-family:Arial,sans-serif;font-size:14px;color:#2563eb;text-decoration:none;">${email}</a></td>
      </tr>
      <tr>
        <td style="padding:14px 20px;border-bottom:1px solid #e5e7eb;"><span style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:1.5px;text-transform:uppercase;">Phone</span></td>
        <td style="padding:14px 20px;border-bottom:1px solid #e5e7eb;"><a href="tel:${phone}" style="font-family:Arial,sans-serif;font-size:14px;color:#2563eb;text-decoration:none;">${phone || "Not provided"}</a></td>
      </tr>
      <tr>
        <td style="padding:14px 20px;background-color:#f9fafb;vertical-align:top;"><span style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:1.5px;text-transform:uppercase;">Message</span></td>
        <td style="padding:14px 20px;background-color:#f9fafb;"><span style="font-family:Arial,sans-serif;font-size:14px;color:#374151;line-height:1.6;">${message || "None"}</span></td>
      </tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;"><tr><td>
      <a href="tel:${phone}" style="display:inline-block;background-color:#0a0a0a;color:#ffffff;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:14px 28px;border-radius:100px;margin-right:10px;">Call Back</a>
      <a href="mailto:${email}" style="display:inline-block;border:1.5px solid #e5e7eb;color:#0a0a0a;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:13px 28px;border-radius:100px;">Reply by Email</a>
    </td></tr></table>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:36px 0;" />
    <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td><p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#9ca3af;line-height:1.6;">© 2025 MunroStudio · Professional websites for UK tradespeople<br/>£55/month · No setup fee · Cancel any time</p></td>
      <td align="right" valign="top"><span style="font-family:Georgia,serif;font-size:14px;font-weight:700;color:#d1d5db;">Munro<em style="color:#93c5fd;font-style:italic;">Studio</em></span></td>
    </tr></table>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false }, { status: 500 });
  }
}