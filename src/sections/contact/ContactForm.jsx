"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { services } from "@/content/services";
import { site, whatsappHref } from "@/config/site";
import Button from "@/components/ui/Button";

/*
  CONTACT › FORM
  Sends the message to /api/contact, which emails it to the studio
  (Gmail + App Password — see .env.example).
*/
const BUDGETS = ["Not sure yet", "Under ₹25,000", "₹25,000 – ₹50,000", "₹50,000 – ₹1,00,000", "₹1,00,000+"];

const inputCls =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-[0.95rem] text-black outline-none transition-[border-color,box-shadow] placeholder:text-gray/40 focus:border-black focus:shadow-[0_0_0_3px_rgba(255,199,0,0.55)]";

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="type-eyebrow mb-2.5 block text-[0.62rem] text-gray">
        {label}
        {required && <span className="text-black/50"> *</span>}
      </span>
      {children}
    </label>
  );
}

export default function ContactForm() {
  const params = useSearchParams();
  const preset = services.find((s) => s.slug === params.get("service"))?.title ?? "";
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("sent");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  return (
    <div className="rounded-[1.75rem] border border-black/[0.08] bg-paper p-6 shadow-[0_30px_80px_-40px_rgba(8,9,11,0.25)] md:p-10">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[26rem] flex-col items-start justify-center"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-yellow text-2xl text-black">✓</span>
            <h3 className="type-h2 mt-8 text-[clamp(1.9rem,3vw,2.6rem)]">Thank you!</h3>
            <p className="type-lead mt-4 max-w-md text-gray">
              Your message has been sent. We&apos;ll get back to you within 1–2 working days.
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0 }} className="space-y-6">
            <div>
              <h2 className="type-h3 text-[1.6rem]">Tell us about your project</h2>
              <p className="mt-2 text-sm text-gray">Fill in the form and we&apos;ll reply within 1–2 working days.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Your name" required>
                <input name="name" required autoComplete="name" className={inputCls} placeholder="Full name" />
              </Field>
              <Field label="Email" required>
                <input name="email" type="email" required autoComplete="email" className={inputCls} placeholder="you@company.com" />
              </Field>
              <Field label="Phone">
                <input name="phone" type="tel" autoComplete="tel" className={inputCls} placeholder="Optional" />
              </Field>
              <Field label="Company / brand">
                <input name="company" autoComplete="organization" className={inputCls} placeholder="Optional" />
              </Field>
              <Field label="Service">
                <select name="service" defaultValue={preset} className={`${inputCls} appearance-none`}>
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Other">Something else</option>
                </select>
              </Field>
              <Field label="Budget">
                <select name="budget" defaultValue="" className={`${inputCls} appearance-none`}>
                  <option value="">Select a range</option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Message" required>
              <textarea name="message" required rows={5} className={`${inputCls} resize-none`} placeholder="What would you like to create?" />
            </Field>

            {/* hidden spam trap — real visitors never fill this in */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            {status === "error" && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
                {error} You can also email us at{" "}
                <a href={`mailto:${site.email}`} className="font-semibold underline">
                  {site.email}
                </a>
                {whatsappHref && (
                  <>
                    {" "}or{" "}
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                      message us on WhatsApp
                    </a>
                  </>
                )}
                .
              </p>
            )}

            <div className="flex flex-col gap-4 border-t border-black/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-gray/70">By sending this form you agree to be contacted about your enquiry.</p>
              <Button type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send Message"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
