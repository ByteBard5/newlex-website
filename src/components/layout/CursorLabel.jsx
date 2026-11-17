"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

/*
  A small yellow "View" bubble that follows the pointer over elements
  marked with data-cursor="View" (project cards). Mouse devices only.
*/
export default function CursorLabel() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
    const inspect = (el) => setLabel(el?.closest?.("[data-cursor]")?.getAttribute("data-cursor") || "");
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      inspect(e.target);
    };
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => inspect(document.elementFromPoint(x.get(), y.get())));
    };
    const leave = () => setLabel("");
    window.addEventListener("mousemove", move);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[120]" style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}>
      <AnimatePresence>
        {label && (
          <motion.span
            key="bubble"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="grid h-20 w-20 place-items-center rounded-full bg-yellow text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-black shadow-lg"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
