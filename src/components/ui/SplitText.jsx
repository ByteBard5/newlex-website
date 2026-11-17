"use client";

import { motion } from "motion/react";
import { useLoaded } from "@/components/layout/LoaderProvider";

/*
  Reveals text word-by-word, sliding up from a mask.
  - onLoad: true  -> play once the intro has finished (use in page heroes)
            false -> play when scrolled into view
  - wordClassName: classes added to every word (e.g. "mark" for the yellow marker)
*/
export default function SplitText({ text, delay = 0, stagger = 0.05, onLoad = false, className = "", wordClassName = "" }) {
  const loaded = useLoaded();
  const words = text.split(" ");
  const control = onLoad
    ? { animate: loaded ? "show" : "hidden" }
    : { whileInView: "show", viewport: { once: true, margin: "-8% 0px" } };

  return (
    <motion.span
      // remount once the intro finishes so the reveal always plays on a fresh page load
      key={onLoad ? String(loaded) : undefined}
      initial="hidden"
      {...control}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden>
          {/* The mask that hides each word before it slides up. It is padded on every side (and pulled back
              with matching negative margins so spacing is unchanged) because a tight mask cut off the parts
              of letters that reach past the line box: the tail of "g"/"y" and the right curve of "o". */}
          <span className="-mx-[0.1em] -mb-[0.28em] -mt-[0.08em] inline-block overflow-hidden px-[0.1em] pb-[0.28em] pt-[0.08em] align-bottom">
            {/* whitespace-pre keeps the space after each word (it would vanish inside an inline-block) */}
            <motion.span
              className={`inline-block whitespace-pre will-change-transform ${wordClassName}`}
              variants={{
                // 140% (not 105%) so the word starts fully below the taller, padded mask
                hidden: { y: "140%" },
                show: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {i < words.length - 1 ? `${word} ` : word}
            </motion.span>
          </span>
          {/* lets the line wrap between words */}
          {i < words.length - 1 ? "​" : ""}
        </span>
      ))}
    </motion.span>
  );
}
