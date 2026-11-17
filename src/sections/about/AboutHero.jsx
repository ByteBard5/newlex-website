"use client";

import { motion } from "motion/react";
import { useLoaded } from "@/components/layout/LoaderProvider";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitText from "@/components/ui/SplitText";
import RotatingBadge from "@/components/ui/RotatingBadge";

// ABOUT › HERO
export default function AboutHero() {
  const loaded = useLoaded();
  const fade = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: loaded ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section className="container-x pb-20 pt-14 md:pb-28 md:pt-24">
      <motion.div {...fade(0)}>
        <Eyebrow>About Us</Eyebrow>
      </motion.div>
      <h1 className="type-h1 mt-8">
        <span className="block">
          <SplitText text="A little about us." onLoad />
        </span>
        <span className="block">
          <SplitText text="A lot about what we love." onLoad delay={0.12} wordClassName="mark" />
        </span>
      </h1>

      <div className="mt-8 flex items-center justify-between gap-12 md:mt-10">
        <motion.p {...fade(0.4)} className="type-lead max-w-2xl text-gray">
          We&apos;re Newlex Designs — an independent creative studio bringing ideas to life through design, imagination,
          and thoughtful execution.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -30 }}
          animate={loaded ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hidden shrink-0 text-black lg:block"
        >
          <RotatingBadge />
        </motion.div>
      </div>
    </section>
  );
}
