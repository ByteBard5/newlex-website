"use client";

import { motion } from "motion/react";
import { useLoaded } from "@/components/layout/LoaderProvider";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitText from "@/components/ui/SplitText";

/*
  SERVICES › HERO
  A small label and a very large two-line statement, ending on a thin rule.
  Modelled on the reference services page the owner chose
  (pinkponycreative.com/services) and matching the Portfolio page hero.
  No intro paragraph: each service row below explains itself.
  The second line uses the yellow marker, because yellow text is unreadable on the light background.
*/
export default function ServicesHero() {
  const loaded = useLoaded();
  return (
    <section className="container-x pb-16 pt-16 md:pb-24 md:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Eyebrow line>How we can work together</Eyebrow>
      </motion.div>
      <h1 className="type-display mt-6 md:mt-8">
        <span className="block">
          <SplitText text="Everything your brand needs," onLoad />
        </span>
        <span className="block">
          <SplitText text="in one studio." onLoad delay={0.15} wordClassName="mark" />
        </span>
      </h1>
    </section>
  );
}
