"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";

/*
  Endless scrolling strip that speeds up (and flips direction) as you scroll.
  - items:      array of words
  - speed:      base speed, negative = right to left
  - separator:  text or JSX shown between items
*/
export default function Marquee({ items, speed = -2, className = "", separator = "✦", sepClassName = "text-yellow" }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let move = direction.current * speed * (Math.min(delta, 64) / 1000);
    if (factor.get() < 0) direction.current = -1;
    else if (factor.get() > 0) direction.current = 1;
    move += direction.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-5 md:px-8">{item}</span>
          <span className={`flex items-center ${sepClassName}`}>{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className="flex w-max" style={{ x }}>
        {row}
        {row}
      </motion.div>
    </div>
  );
}
