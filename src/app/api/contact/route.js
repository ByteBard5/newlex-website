import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/*
  Contact form endpoint — emails every enquiry to the studio.

  Uses Gmail with an App Password. Set these in .env.local (on your computer)
  and in Vercel → Project → Settings → Environment Variables:
    SMTP_USER         the Gmail address that sends the email
    SMTP_PASS         the 16-character Gmail App Password
    CONTACT_TO_EMAIL  where enquiries should arrive (defaults to SMTP_USER)
    SMTP_HOST / SMTP_PORT  optional, default smtp.gmail.com / 465
*/
export const runtime = "nodejs";

const LIMITS = { name: 120, email: 200, phone: 40, company: 160, service: 120, budget: 60, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const oneLine = (s) => String(s).replace(/[\r\n]+/g, " ").trim();

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden "website" field — pretend success and ignore it.
  if (body.website) return NextResponse.json({ ok: true });

  const data = {};
  for (const [key, max] of Object.entries(LIMITS)) data[key] = String(body[key] ?? "").trim().slice(0, max);

  if (!data.name || !data.message) {
    return NextResponse.json({ error: "Please add your name and a message." }, { status: 400 });
  }
  if (!EMAIL_RE.test(data.email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const { SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, SMTP_HOST = "smtp.gmail.com", SMTP_PORT = "465" } = process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    if (process.env.NODE_ENV === "development") {
      console.log("[contact] Email not configured yet — message received:", data);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[contact] SMTP_USER / SMTP_PASS are not set.");
    return NextResponse.json({ error: "The contact form isn't connected yet." }, { status: 503 });
  }

  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Company", data.company],
    ["Service", data.service],
    ["Budget", data.budget],
  ].filter(([, v]) => v);

  const text = `New enquiry from the Newlex Designs website\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${data.message}\n`;

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#333333">
    <div style="border-top:4px solid #ffc700;padding:24px 0 8px">
      <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#08090b">New website enquiry</p>
      <h1 style="margin:8px 0 0;font-size:22px;color:#08090b">${escapeHtml(data.name)}${data.service ? ` — ${escapeHtml(data.service)}` : ""}</h1>
    </div>
    <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 0;border-bottom:1px solid #eeeeee;color:#777777;width:120px">${k}</td><td style="padding:8px 0;border-bottom:1px solid #eeeeee;color:#08090b">${escapeHtml(v)}</td></tr>`
        )
        .join("")}
    </table>
    <p style="margin:24px 0 8px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#777777">Message</p>
    <p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap;color:#08090b">${escapeHtml(data.message)}</p>
    <p style="margin:32px 0 0;font-size:12px;color:#999999">Reply to this email to answer ${escapeHtml(data.name)} directly.</p>
  </div>`;

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Newlex Designs Website" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL || SMTP_USER,
      replyTo: { name: oneLine(data.name), address: data.email },
      subject: oneLine(`New enquiry: ${data.name}${data.service ? ` — ${data.service}` : ""}`),
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Email failed:", err?.message);
    return NextResponse.json({ error: "Sorry, your message couldn't be sent right now." }, { status: 500 });
  }
}
