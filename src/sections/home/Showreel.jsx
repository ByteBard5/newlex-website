"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import AutoVideo from "@/components/ui/AutoVideo";

/*
  HOME › SHOWREEL
  A wide video from one of the CGI projects that grows to full size as you scroll.
  It uses the first project (by order) that has a landscape video.
*/
export default function Showreel({ project }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.2"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [36, 18]);

  if (!project) return null;
  const video = project.results.find((r) => r.type === "video");
  const poster = project.gallery[0] ?? project.thumbnail;

  return (
    <section ref={ref} className="container-x mt-16 md:mt-24">
      <motion.div style={{ scale, borderRadius: radius }} className="relative aspect-[4/5] overflow-hidden bg-black sm:aspect-[16/9]">
        <AutoVideo src={video.src} poster={poster} className="absolute inset-0 h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between md:p-10">
          <div>
            <p className="type-eyebrow text-white/70">Featured · {project.category}</p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-white md:text-3xl">{project.title}</p>
          </div>
          <Link
            href={`/portfolio/${project.id}`}
            className="group inline-flex h-12 items-center gap-3 self-start rounded-full bg-white px-6 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-black transition-colors hover:bg-yellow sm:self-auto"
          >
            View Project
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
