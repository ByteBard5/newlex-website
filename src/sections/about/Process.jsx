"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { process } from "@/content/studio";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitText from "@/components/ui/SplitText";

/*
  ABOUT › PROCESS — five steps joined by a line that fills in as you scroll.
  Edit the steps in src/content/studio.js
*/
export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="container-x section-y">
      <div className="mb-16 grid gap-6 md:mb-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>Our Process</Eyebrow>
        </div>
        <div className="lg:col-span-8">
          <h2 className="type-h2">
            <SplitText text="A clear path from first idea to final file." />
          </h2>
          <p className="type-lead mt-6 max-w-2xl text-gray">
            Every project follows the same five steps — so you always know where we are, what&apos;s next and when it
            will be ready.
          </p>
        </div>
      </div>

      <ol ref={ref} className="relative grid gap-12 lg:grid-cols-5 lg:gap-6">
        {/* connecting line (laptop+: horizontal, phone/tablet: vertical) */}
        <span className="absolute left-6 top-0 h-full w-px bg-black/10 lg:left-0 lg:top-6 lg:h-px lg:w-full" />
        <motion.span style={{ scaleX: fill }} className="absolute left-0 top-6 hidden h-px w-full origin-left bg-black lg:block" />
        <motion.span style={{ scaleY: fill }} className="absolute left-6 top-0 h-full w-px origin-top bg-black lg:hidden" />

        {process.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-20 lg:pl-0"
          >
            <span className="absolute left-0 top-0 z-10 grid h-12 w-12 place-items-center rounded-full border border-black/15 bg-white text-sm font-bold text-black lg:relative">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="type-h3 lg:mt-10">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray">{s.text}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
