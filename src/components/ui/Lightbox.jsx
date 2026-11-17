"use client";

import { useEffect } from "react";
import Image from "@/components/ui/SmartImage";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";

/*
  Full-screen image viewer.
  images: array of image links   index: open image (null = closed)
*/
export default function Lightbox({ images, index, onClose, onChange }) {
  const lenis = useLenis();
  const open = index !== null && index !== undefined;

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, index, images.length, lenis, onClose, onChange]);

  const step = (e, dir) => {
    e.stopPropagation();
    onChange((index + dir + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            key={index}
            className="relative h-[82vh] w-[92vw]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image src={images[index]} alt="" fill sizes="92vw" className="object-contain" />
          </motion.div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-xl text-white transition-colors hover:bg-yellow hover:text-black md:right-8 md:top-8"
          >
            ✕
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => step(e, -1)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-yellow hover:text-black md:left-8"
              >
                ←
              </button>
              <button
                type="button"
                onClick={(e) => step(e, 1)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-yellow hover:text-black md:right-8"
              >
                →
              </button>
              <p className="type-eyebrow absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60">
                {index + 1} / {images.length}
              </p>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
