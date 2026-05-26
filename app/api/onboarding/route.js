import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const {
    businessName, contactName, phone, email, industry,
    currentWebsite, goals, domainName, hasLogo, hasPhotos,
    colorPreferences, services, targetArea, budget, deadline, notes,
  } = await req.json();

  const goalsText = Array.isArray(goals) && goals.length > 0 ? goals.join(", ") : "None selected";

  const row = (label, value) =>
    value
      ? `<tr>
          <td style="padding:12px 20px;background-color:#f9fafb;border-bottom:1px solid #e5e7eb;width:160px;vertical-align:top;">
            <span style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:1.5px;text-transform:uppercase;">${label}</span>
          </td>
          <td style="padding:12px 20px;border-bottom:1px solid #e5e7eb;">
            <span style="font-family:Arial,sans-serif;font-size:14px;color:#111827;line-height:1.6;">${value}</span>
          </td>
        </tr>`
      : "";

  try {
    await resend.emails.send({
      from: "MunroStudio <onboarding@resend.dev>",
      to: "euanmunroo@gmail.com",
      subject: `New onboarding: ${businessName} — ${contactName}`,
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
      <td align="right"><span style="font-family:Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.35);letter-spacing:2px;text-transform:uppercase;">New Client Onboarding</span></td>
    </tr></table>
  </td></tr>
  <tr><td style="background-color:#0a0a0a;padding:0 40px 36px 40px;">
    <p style="margin:0 0 4px 0;font-family:Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.35);letter-spacing:2px;text-transform:uppercase;">New project submission</p>
    <h1 style="margin:0;font-family:Georgia,serif;font-size:36px;font-weight:900;color:#ffffff;line-height:1.1;letter-spacing:-1px;">${businessName}</h1>
    <p style="margin:8px 0 0 0;font-family:Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.5);">${contactName} · ${industry || "Business"}</p>
  </td></tr>
  <tr><td style="background-color:#ffffff;padding:40px;border-radius:0 0 16px 16px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      ${row("Business", businessName)}
      ${row("Contact", contactName)}
      ${row("Phone", `<a href="tel:${phone}" style="color:#2563eb;text-decoration:none;">${phone}</a>`)}
      ${row("Email", `<a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a>`)}
      ${row("Industry", industry)}
      ${row("Goals", goalsText)}
      ${row("Current Site", currentWebsite || "None")}
      ${row("Domain", domainName || "Not decided")}
      ${row("Logo", hasLogo)}
      ${row("Photos", hasPhotos)}
      ${row("Colours", colorPreferences)}
      ${row("Services", services)}
      ${row("Target Area", targetArea)}
      ${row("Budget", budget)}
      ${row("Deadline", deadline)}
      ${row("Notes", notes || "None")}
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;"><tr><td>
      <a href="tel:${phone}" style="display:inline-block;background-color:#0a0a0a;color:#ffffff;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:14px 28px;border-radius:100px;margin-right:10px;">Call Back</a>
      <a href="mailto:${email}" style="display:inline-block;border:1.5px solid #e5e7eb;color:#0a0a0a;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:13px 28px;border-radius:100px;">Reply by Email</a>
    </td></tr></table>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:36px 0;" />
    <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#9ca3af;line-height:1.6;">© 2026 MunroStudio · euanmunroo@gmail.com · 07485 218 091</p>
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
