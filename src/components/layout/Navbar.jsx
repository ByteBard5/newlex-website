"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { site } from "@/config/site";
import Button from "@/components/ui/Button";

// Top navigation bar (brand black, so the yellow logo always shows at its best).
// On phones the links open as a dropdown.
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        scrolled || open ? "border-white/[0.08] bg-black/90 backdrop-blur-md" : "border-transparent bg-black"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-6 md:h-20">
        <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
          <Image src="/brand/newlex-logo-on-dark.png" alt={site.name} width={1304} height={419} sizes="128px" priority className="h-8 w-auto md:h-9" />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1 lg:gap-2">
            {site.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative inline-flex px-3 py-2 text-[0.95rem] font-medium transition-colors lg:px-4 ${
                      active ? "text-yellow" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-3 bottom-0.5 h-[2px] origin-left bg-yellow transition-transform duration-300 ease-out-expo lg:inset-x-4 ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/contact" size="sm" variant="accent" className="hidden lg:inline-flex">
            Let&apos;s Talk
          </Button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 md:hidden"
          >
            <span className="relative block h-3 w-5">
              <motion.span className="absolute left-0 top-0 h-[2px] w-full bg-white" animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} />
              <motion.span className="absolute bottom-0 left-0 h-[2px] w-full bg-white" animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} />
            </span>
          </button>
        </div>
      </div>

      {/* Phone menu — drops down from the top bar */}
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/[0.08] bg-black md:hidden"
          >
            <ul className="container-x pt-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between border-b border-white/[0.08] py-4 font-display text-lg font-bold ${
                      isActive(item.href) ? "text-yellow" : "text-white"
                    }`}
                  >
                    {item.label}
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="container-x pb-6 pt-5">
              <Button href="/contact" variant="accent" className="w-full">
                Let&apos;s Talk
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
