"use client";

import { motion } from "motion/react";
import { useLoaded } from "@/components/layout/LoaderProvider";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitText from "@/components/ui/SplitText";

/*
  PORTFOLIO › HERO
  A small label and one very large two-line statement, with a lot of empty
  space under it before the work starts. Modelled on the reference work page
  the owner chose (pinkponycreative.com/work): no intro paragraph, so the
  projects carry the page. The second line uses the yellow marker, because
  yellow text is unreadable on the light background.
*/
export default function PortfolioHero() {
  const loaded = useLoaded();
  return (
    <section className="container-x pb-16 pt-16 md:pb-32 md:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Eyebrow line>Our work</Eyebrow>
      </motion.div>
      <h1 className="type-display mt-6 md:mt-8">
        <span className="block">
          <SplitText text="Ideas we've made" onLoad />
        </span>
        <span className="block">
          <SplitText text="unforgettable." onLoad delay={0.15} wordClassName="mark" />
        </span>
      </h1>
    </section>
  );
}
