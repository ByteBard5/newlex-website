"use client";

import { motion } from "motion/react";
import { useLoaded } from "@/components/layout/LoaderProvider";

/*
  PORTFOLIO › HERO
  A centred two-line headline on black; the last words are set in italic yellow.
  Structure follows the reference work page the owner chose (studiosixf.com/our-work).
  Yellow text is used here only because the background is dark.
*/
export default function PortfolioHero() {
  const loaded = useLoaded();
  return (
    <section className="bg-black text-white">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="container-x pb-10 pt-14 text-center font-display text-[clamp(2rem,3.4vw,3rem)] font-bold leading-[1.15] tracking-[-0.02em] text-white md:pb-12 md:pt-20"
      >
        Ideas from unseen,
        <br />
        made <em className="font-sans font-normal italic text-yellow">unforgettable</em>
      </motion.h1>
    </section>
  );
}
