"use client";

import Image from "@/components/ui/SmartImage";
import { motion } from "motion/react";
import { useLoaded } from "@/components/layout/LoaderProvider";
import { categoryLabel } from "@/lib/projects";

/*
  PROJECT › HEADER
  Centred title block (title + optional year, optional services line, category),
  then the cover picture across the full width of the screen.
  Structure follows the reference project page the owner chose (studiosixf.com/portfolio/…).
  Fields: title, year, services, category, thumbnail (src/content/projects/<project>.js).
*/
export default function ProjectHeader({ project }) {
  const loaded = useLoaded();
  const fade = (delay) => ({
    initial: { opacity: 0, y: 16 },
    animate: loaded ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section className="bg-black text-white">
      <div className="container-x pb-12 pt-14 text-center md:pb-16 md:pt-20">
        <motion.h1 {...fade(0)} className="font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-extrabold leading-tight tracking-[-0.02em] text-white">
          {project.title}
          {project.year && <span className="ml-3 align-middle text-base font-medium tracking-normal text-white/50">{project.year}</span>}
        </motion.h1>
        {project.services.length > 0 && (
          <motion.p {...fade(0.1)} className="mx-auto mt-5 max-w-2xl text-base font-light text-white/85">
            {project.services.join(", ")}
          </motion.p>
        )}
        {project.category && (
          <motion.div {...fade(0.2)} className="mt-8">
            <p className="text-base text-white/45 md:text-lg">Category</p>
            <p className="mt-1 text-base text-white md:text-lg">{categoryLabel(project.category)}</p>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.25 }}
        className="relative h-[60vw] max-h-[100svh] min-h-[320px] w-full overflow-hidden bg-white/5 md:h-[62.5vw]"
      >
        <Image src={project.thumbnail} alt={project.title} fill priority sizes="100vw" className="object-cover" />
      </motion.div>
    </section>
  );
}
