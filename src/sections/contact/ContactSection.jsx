import { Suspense } from "react";
import { site, whatsappHref } from "@/config/site";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "./ContactForm";

// CONTACT › DETAILS + FORM. Contact details are edited in src/config/site.js
export default function ContactSection() {
  const details = [
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    site.phone && { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    whatsappHref && { label: "WhatsApp", value: "Chat with us on WhatsApp", href: whatsappHref, external: true },
    { label: "Studio", value: site.location },
    { label: "Availability", value: site.availability },
  ].filter(Boolean);

  return (
    <section className="container-x grid gap-14 pb-24 md:pb-32 lg:grid-cols-12 lg:gap-16">
      <Reveal className="lg:col-span-4">
        <dl className="divide-y divide-black/10 border-y border-black/10">
          {details.map((d) => (
            <div key={d.label} className="py-6">
              <dt className="type-eyebrow text-[0.62rem] text-gray/60">{d.label}</dt>
              <dd className="mt-2 text-lg font-semibold text-black">
                {d.href ? (
                  <a href={d.href} {...(d.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-yellow">
                    {d.value}
                  </a>
                ) : (
                  d.value
                )}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-8">
          <p className="type-eyebrow text-[0.62rem] text-gray/60">Follow</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-black transition-colors hover:border-black hover:bg-black hover:text-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="lg:col-span-8">
        <Suspense>
          <ContactForm />
        </Suspense>
      </Reveal>
    </section>
  );
}
