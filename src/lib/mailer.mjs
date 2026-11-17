import nodemailer from "nodemailer";

/*
  MAIL SETTINGS — server only. Used by the contact form (app/api/contact/route.js)
  and by `npm run check-email` (scripts/check-email.mjs), so both read the
  settings the same way.

  The values come from environment variables, never from code:
    • on your computer: the file .env.local in the project folder (never uploaded to GitHub)
    • on the live site:  the hosting dashboard, e.g. Vercel → Settings → Environment Variables
  See .env.example for the list.
*/
export function getMailConfig() {
  const env = process.env;
  const user = (env.SMTP_USER || "").trim();
  // Google shows App Passwords in groups ("abcd efgh ijkl mnop"); the spaces are not part of it.
  const pass = (env.SMTP_PASS || "").replace(/\s+/g, "");
  const port = Number(env.SMTP_PORT || 465);
  return {
    user,
    pass,
    to: (env.CONTACT_TO_EMAIL || "").trim() || user,
    host: (env.SMTP_HOST || "smtp.gmail.com").trim(),
    port,
    ready: Boolean(user && pass),
  };
}

export function createMailer(cfg = getMailConfig()) {
  return nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.port === 465,
    auth: { user: cfg.user, pass: cfg.pass },
  });
}
