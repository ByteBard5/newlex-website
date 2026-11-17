"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useLoaded } from "@/components/layout/LoaderProvider";
import SplitText from "@/components/ui/SplitText";
import Button from "@/components/ui/Button";
import HeroMosaic from "./HeroMosaic";
import { hero, heroImages, heroSpeed } from "@/content/hero";

/*
  HOME › HERO — full-screen moving photo wall with the headline centred on top.
  Edit the text and the photos in src/content/hero.js
*/
export default function Hero() {
  const loaded = useLoaded();
  const fade = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: loaded ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section className="relative isolate flex h-[calc(100svh-72px)] min-h-[600px] items-center overflow-hidden bg-black md:h-[calc(100svh-80px)] md:min-h-[640px]">
      <HeroMosaic images={heroImages} speed={heroSpeed} />

      {/* shade over the photos (darkest in the middle, behind the text) so it always stays easy to read */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/30" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_52%_at_50%_50%,rgba(8,9,11,0.78)_0%,rgba(8,9,11,0.45)_55%,rgba(8,9,11,0.08)_100%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="container-x relative z-10 flex flex-col items-center text-center">
        <motion.p {...fade(0)} className="type-eyebrow flex items-center gap-4 text-white/80">
          <span aria-hidden className="hidden h-px w-14 bg-yellow sm:block" />
          {hero.eyebrow}
          <span aria-hidden className="hidden h-px w-14 bg-yellow sm:block" />
        </motion.p>

        <h1 className="type-display mt-7 text-white [text-shadow:0_4px_40px_rgba(0,0,0,0.35)] md:mt-9">
          <span className="block">
            <SplitText text={hero.title} onLoad />
          </span>
          <span className="block text-yellow">
            <SplitText text={hero.accent} onLoad delay={0.15} />
          </span>
        </h1>

        <motion.p {...fade(0.45)} className="type-lead mt-7 max-w-xl text-white/85 [text-shadow:0_2px_20px_rgba(0,0,0,0.4)] md:mt-9">
          {hero.text}
        </motion.p>

        <motion.div {...fade(0.6)} className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:mt-11">
          <Button href={hero.primary.href} variant="accent">
            {hero.primary.label}
          </Button>
          <Link href={hero.secondary.href} className="group inline-flex py-2 text-[0.98rem] font-medium text-white">
            <span className="border-b border-white/40 pb-0.5 transition-colors duration-300 group-hover:border-yellow group-hover:text-yellow">
              {hero.secondary.label}
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
