import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY ?? '');

export async function POST(request) {
  try {
    const { name, phone, trade, email, message } = await request.json();

    await resend.emails.send({
      from: "MunroStudio <onboarding@resend.dev>",
      to: "euanmunroo@gmail.com",
      subject: `New Website Enquiry — ${trade}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9; border-radius: 8px;">
          <h2 style="margin: 0 0 24px; font-size: 20px; color: #111;">New Tradesman Enquiry 🔧</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px; width: 120px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px; color: #111;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px;">Trade</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px; color: #111;">${trade}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px; color: #111;">
                <a href="mailto:${email}" style="color: #111;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px; color: #111;">
                <a href="tel:${phone}" style="color: #111;">${phone || "Not provided"}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top; padding-top: 14px;">Message</td>
              <td style="padding: 10px 0; font-size: 14px; color: #111; padding-top: 14px; line-height: 1.6;">${message || "No message provided"}</td>
            </tr>
          </table>

          <div style="margin-top: 32px; padding: 16px; background: #111; border-radius: 6px; text-align: center;">
            <a href="mailto:${email}" style="color: white; font-size: 13px; text-decoration: none; font-weight: 600;">
              Reply to ${name} →
            </a>
          </div>

          <p style="margin-top: 24px; font-size: 11px; color: #aaa; text-align: center;">
            Sent from munro-studio.vercel.app/tradesmen
          </p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}