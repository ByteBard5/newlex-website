"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "@/components/ui/SmartImage";
import { useLoaded } from "@/components/layout/LoaderProvider";

/*
  HOME › HERO MOSAIC — a bento board of projects, wider than the screen, that works
  like a slider:
  - it SLIDES sideways (and a little up / down), so new projects come in from one
    edge while others leave from the other,
  - along the way it ZOOMS IN: one project grows big in the middle while the board
    slides it into view — then ZOOMS OUT back to the grid,
  - every move starts slow, snaps through the middle and lands softly (momentum).
  It follows a fixed route (ROUTE below), so it flows instead of jumping at random.
  Photos and speed are set in src/content/hero.js
*/

// The board: 8 columns × 3 rows. Relative widths of the columns and heights of
// the tiles in each column give it the bento look.
const COL_WIDTHS = [1.15, 0.85, 1.1, 0.95, 1.2, 0.9, 1.05, 1];
const ROW_HEIGHTS = [
  [1.1, 0.85, 1.05],
  [0.9, 1.2, 0.9],
  [1, 1.1, 0.9],
  [1.2, 0.8, 1],
  [0.85, 1.1, 1.05],
  [1.05, 0.95, 1],
  [0.9, 1.15, 0.95],
  [1.1, 0.9, 1],
];
const COLS = COL_WIDTHS.length;
const ROWS = 3;

// The route. view: [column, row] the screen is centred on (wide view, many projects).
// focus: [column, row] of the project that grows big in the middle (zoom in).
const ROUTE = [
  { view: [1.5, 1] },
  { view: [2.6, 0.7] }, // slide right
  { focus: [3, 1] }, // zoom in
  { view: [4.2, 1.2] }, // zoom out, keep sliding right
  { view: [5.3, 0.9] },
  { focus: [6, 0] }, // zoom in
  { focus: [5, 2] }, // slide to the next project while zoomed in
  { view: [4.4, 1.1] }, // zoom out
  { view: [3, 1.3] }, // slide back left
  { focus: [1, 2] }, // zoom in
  { view: [2, 0.9] }, // zoom out
  { focus: [2, 0] }, // zoom in, then the route starts again
];

const MOVE = 0.8; // seconds each move takes
const EASE = "cubic-bezier(0.86, 0, 0.07, 1)"; // slow start, very fast middle, soft landing
const SIZES = "(min-width: 1024px) 50vw, (min-width: 768px) 60vw, 75vw";

const sum = (list) => list.reduce((a, b) => a + b, 0);
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// Columns on screen at a time: laptops 4, tablets 3, phones 2
const visibleCols = () => (window.matchMedia("(min-width: 1024px)").matches ? 4 : window.matchMedia("(min-width: 768px)").matches ? 3 : 2);

function arrangement(stop, visible) {
  if (!stop.focus) return { cols: COL_WIDTHS, rows: ROW_HEIGHTS, at: stop.view, zoom: 1 };
  const [c, r] = stop.focus;
  const big = visible === 2 ? 1.25 : visible === 3 ? 1.8 : 2.2;
  return {
    cols: COL_WIDTHS.map((w, i) => (i === c ? big : w * 0.92)),
    rows: ROW_HEIGHTS.map((col, i) => (i === c ? col.map((_, j) => (j === r ? 2.6 : 0.6)) : col)),
    at: [c, r],
    zoom: 1.07,
  };
}

// Centre of each piece, as a fraction (0–1) of the whole length
function centres(sizes) {
  const total = sum(sizes);
  let start = 0;
  return sizes.map((s) => {
    const c = (start + s / 2) / total;
    start += s;
    return c;
  });
}
const lerpAt = (list, pos) => {
  const i = clamp(Math.floor(pos), 0, list.length - 1);
  const j = clamp(Math.ceil(pos), 0, list.length - 1);
  return list[i] + (list[j] - list[i]) * (pos - Math.floor(pos));
};

// Where the board must slide (in % of its own size) to centre the screen on the stop
function slideTo(layout, visible, tall) {
  const wide = COLS / visible; // board width ÷ screen width
  const [c, r] = layout.at;
  const cx = lerpAt(centres(layout.cols), c);
  const cy = lerpAt(centres(layout.rows[clamp(Math.round(c), 0, COLS - 1)]), r);
  return {
    x: clamp(50 / wide - cx * 100, -(100 - 100 / wide), 0),
    y: clamp(50 / tall - cy * 100, -(100 - 100 / tall), 0),
  };
}

export default function HeroMosaic({ images, speed = 1600 }) {
  const loaded = useLoaded();
  const ref = useRef(null);
  const [stop, setStop] = useState(0);
  const [visible, setVisible] = useState(4);

  // follow the screen size
  useEffect(() => {
    const update = () => setVisible(visibleCols());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // move along the route
  useEffect(() => {
    if (!loaded || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let inView = true;
    const io = new IntersectionObserver(([entry]) => (inView = entry.isIntersecting), { threshold: 0.05 });
    io.observe(ref.current);
    const next = () => inView && !document.hidden && setStop((s) => (s + 1) % ROUTE.length);
    const first = setTimeout(next, 900);
    const timer = setInterval(next, speed);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
      io.disconnect();
    };
  }, [loaded, speed]);

  if (!images.length) return null;

  const tall = visible === 2 ? 1.15 : 1.25; // board height ÷ screen height
  const layout = arrangement(ROUTE[stop], visible);
  const { x, y } = slideTo(layout, visible, tall);
  const move = (prop) => `${prop} ${MOVE}s ${EASE}`;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      initial={{ opacity: 0 }}
      animate={loaded ? { opacity: 1 } : {}}
      transition={{ duration: 1.2, ease: "easeOut" }}
      // z-0 keeps the photos underneath the shade and the text
      className="absolute inset-0 z-0 overflow-hidden"
    >
      {/* camera: leans in a little when a project is in focus */}
      <div className="absolute inset-0" style={{ transform: `scale(${layout.zoom})`, transition: move("transform") }}>
        {/* the board slides */}
        <div
          className="absolute left-0 top-0 flex gap-1.5 p-1.5 will-change-transform md:gap-2 md:p-2"
          style={{
            width: `${(COLS / visible) * 100}%`,
            height: `${tall * 100}%`,
            transform: `translate3d(${x.toFixed(2)}%, ${y.toFixed(2)}%, 0)`,
            transition: move("transform"),
          }}
        >
          {layout.cols.map((w, c) => (
            <div key={c} className="flex min-w-0 flex-col gap-1.5 md:gap-2" style={{ flexGrow: w, flexBasis: 0, transition: move("flex-grow") }}>
              {layout.rows[c].map((h, r) => {
                const i = c * ROWS + r;
                return (
                  <div
                    key={r}
                    className="relative min-h-0 overflow-hidden rounded-lg bg-white/[0.05] md:rounded-xl"
                    style={{ flexGrow: h, flexBasis: 0, transition: move("flex-grow") }}
                  >
                    <div
                      className="kenburns absolute inset-0"
                      style={{ animationDuration: `${9 + (i % 4) * 1.5}s`, animationDelay: `-${(i * 2.3) % 9}s` }}
                    >
                      <Image src={images[i % images.length]} alt="" fill sizes={SIZES} loading="eager" draggable={false} className="object-cover" />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
