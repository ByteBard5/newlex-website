"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/config/site";
import { useSetLoaded } from "./LoaderProvider";

// Short intro with the logo and a progress line. Plays once per visit.
export default function Preloader() {
  const setLoaded = useSetLoaded();
  const [p, setP] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
      sessionStorage.setItem("intro-seen", "1");
    } catch {}
    if (seen) {
      setVisible(false);
      setLoaded(true);
      return;
    }

    const duration = 1500;
    const start = performance.now();
    let frame;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setP(1);
      setTimeout(() => {
        setVisible(false);
        setLoaded(true);
      }, 300);
    };
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setP(1 - Math.pow(1 - t, 3));
      if (t < 1) frame = requestAnimationFrame(tick);
      else finish();
    };
    frame = requestAnimationFrame(tick);
    const fallback = setTimeout(finish, duration + 1500);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(fallback);
    };
  }, [setLoaded]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          data-preloader
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex w-[min(78vw,340px)] flex-col items-center">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <Image src="/brand/newlex-logo-on-dark.png" alt={site.name} width={1304} height={419} sizes="340px" loading="eager" className="h-auto w-full" />
            </motion.div>
            <div className="mt-8 h-[2px] w-full overflow-hidden bg-white/10">
              <div className="h-full bg-yellow" style={{ width: `${p * 100}%` }} />
            </div>
            <div className="type-eyebrow mt-4 flex w-full justify-between text-[0.62rem] text-white/55">
              <span>{site.tagline}</span>
              <span>{String(Math.round(p * 100)).padStart(3, "0")}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
