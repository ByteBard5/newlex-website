// Tests the contact-form email connection using the settings in .env.local.
//   npm run check-email          → checks that Gmail accepts the address + App Password
//   npm run check-email -- --send → also sends a test email to CONTACT_TO_EMAIL
// Never prints the password.
import fs from "node:fs";
import { createMailer, getMailConfig } from "../src/lib/mailer.mjs";

if (fs.existsSync(".env.local")) process.loadEnvFile(".env.local");
else {
  console.log("✗ No .env.local file found. Copy .env.example to .env.local and fill it in.");
  process.exit(1);
}

const cfg = getMailConfig();
const missing = [!cfg.user && "SMTP_USER", !cfg.pass && "SMTP_PASS"].filter(Boolean);
if (missing.length) {
  console.log(`✗ Fill in ${missing.join(" and ")} in .env.local, save, and run this again.`);
  process.exit(1);
}
if (cfg.host === "smtp.gmail.com" && cfg.pass.length !== 16) {
  console.log(`! SMTP_PASS has ${cfg.pass.length} characters; a Gmail App Password has 16. Check you copied all of it.`);
}

console.log(`Connecting to ${cfg.host} as ${cfg.user} …`);
const mailer = createMailer(cfg);
try {
  await mailer.verify();
  console.log("✓ Connected. The contact form can send email.");
  console.log(`  Enquiries will arrive at: ${cfg.to}`);
} catch (err) {
  console.log("✗ Gmail refused the login:", err.message);
  console.log("  Check: SMTP_USER is the full Gmail address, SMTP_PASS is the App Password (not your normal");
  console.log("  password), and 2-Step Verification is turned on for that Google account.");
  process.exit(1);
}

if (process.argv.includes("--send")) {
  await mailer.sendMail({
    from: `"Newlex Designs Website" <${cfg.user}>`,
    to: cfg.to,
    subject: "Test email from the website contact form",
    text: "If you can read this, the contact form email is working.",
  });
  console.log(`✓ Test email sent to ${cfg.to}. Check that inbox (and spam).`);
}
