"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitText from "@/components/ui/SplitText";

/*
  ABOUT › OUR STORY — text only, told in three steps.
  Laptops and larger: the heading stays in place on the left while the story scrolls
  on the right. Phones and tablets: heading on top, story underneath.
  A line fills in as you scroll through the steps.
*/
const CHAPTERS = [
  {
    label: "Where it began",
    text: "Creativity has been part of our world since childhood. From sharing ideas and exploring our imaginations to discovering our love for design, we've always dreamed of creating something of our own.",
  },
  {
    label: "A shared vision",
    text: "What started as a childhood passion slowly turned into a shared vision — and that's how Newlex Designs came to life.",
    highlight: true,
  },
  {
    label: "Today",
    text: "Today, we're turning that dream into a creative studio where ideas grow, imagination leads, and every design tells a story.",
  },
];

export default function OurStory() {
  const steps = useRef(null);
  const { scrollYProgress } = useScroll({ target: steps, offset: ["start 0.75", "end 0.55"] });

  return (
    <section className="container-x pb-24 md:pb-32 lg:pb-36">
      <div className="grid gap-12 border-t border-black/10 pt-14 md:gap-14 md:pt-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="type-h2 mt-7">
              <span className="block">
                <SplitText text="Two siblings." />
              </span>
              <span className="block">
                <SplitText text="One childhood dream." delay={0.1} wordClassName="mark" />
              </span>
            </h2>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ol ref={steps} className="relative max-w-3xl space-y-12 pl-9 sm:pl-12 md:space-y-14 md:pl-14">
            {/* line that fills in while scrolling */}
            <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-black/10" />
            <motion.span
              aria-hidden
              style={{ scaleY: scrollYProgress }}
              className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-black"
            />
            {CHAPTERS.map((c, i) => (
              <motion.li
                key={c.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <span
                  aria-hidden
                  className="absolute -left-9 top-1 h-[15px] w-[15px] rounded-full border-2 border-black bg-yellow sm:-left-12 md:-left-14"
                />
                <p className="type-eyebrow text-gray/70">
                  {String(i + 1).padStart(2, "0")} — {c.label}
                </p>
                <p
                  className={
                    c.highlight
                      ? "mt-4 font-display text-[clamp(1.35rem,2.3vw,2.1rem)] font-bold leading-[1.3] tracking-[-0.025em] text-black"
                      : "type-lead mt-4 text-gray"
                  }
                >
                  {c.text}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
