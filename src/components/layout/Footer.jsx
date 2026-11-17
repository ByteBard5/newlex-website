import Link from "next/link";
import Image from "next/image";
import { site } from "@/config/site";
import { services } from "@/content/services";
import SocialIcon from "@/components/ui/SocialIcon";

// Shown at the bottom of every page.
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white/65">
      <div className="container-x pt-20 md:pt-28">
        {/* Statement */}
        <p className="type-h1 max-w-5xl text-white">
          {site.tagline.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="text-yellow">{site.tagline.split(" ").slice(-1)}.</span>
        </p>

        <div className="mt-16 grid gap-12 border-t border-white/10 pt-14 sm:grid-cols-3 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-3 lg:col-span-5">
            <Image src="/brand/newlex-logo-on-dark.png" alt={site.name} width={1304} height={419} sizes="160px" className="h-10 w-auto" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed">{site.description}</p>
          </div>

          <div className="lg:col-span-2">
            <p className="type-eyebrow mb-5 text-white/40">Explore</p>
            <ul className="space-y-3 text-sm">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-yellow">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="type-eyebrow mb-5 text-white/40">Services</p>
            <ul className="space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className="transition-colors hover:text-yellow">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="type-eyebrow mb-5 text-white/40">Contact</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="break-all text-white transition-colors hover:text-yellow">
                  {site.email}
                </a>
              </li>
              {site.phone && (
                <li>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-yellow">
                    {site.phone}
                  </a>
                </li>
              )}
              <li>{site.location}</li>
            </ul>
          </div>
        </div>

        {/* Very bottom: copyright, social icons (from site.socials), tagline */}
        <div className="mt-16 flex flex-col gap-5 border-t border-white/10 py-8 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Social media">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-yellow hover:bg-yellow hover:text-black"
                >
                  <SocialIcon label={s.label} />
                </a>
              </li>
            ))}
          </ul>
          <p className="type-eyebrow text-[0.65rem]">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
