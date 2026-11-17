"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// Expand / collapse list — used for FAQs.  items: [{ question, answer }]
export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="border-t border-black/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className="border-b border-black/10">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
            >
              <span className="font-display text-base font-bold tracking-[-0.01em] text-black md:text-lg">{item.question}</span>
              <span
                className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                  isOpen ? "border-yellow bg-yellow" : "border-black/15 group-hover:border-black"
                }`}
              >
                <span className="absolute h-[1.5px] w-3.5 bg-black" />
                <span className={`absolute h-3.5 w-[1.5px] bg-black transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 leading-relaxed text-gray">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
