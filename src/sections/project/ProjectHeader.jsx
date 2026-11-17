"use client";

import Link from "next/link";
import Image from "@/components/ui/SmartImage";
import { motion } from "motion/react";
import { useLoaded } from "@/components/layout/LoaderProvider";
import SplitText from "@/components/ui/SplitText";

// PROJECT › HEADER — title, intro, project details and the thumbnail.
export default function ProjectHeader({ project }) {
  const loaded = useLoaded();
  const fade = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: loaded ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
  });

  const details = [
    ["Category", project.category],
    ["Project Type", project.projectType],
    ["Role", project.role],
    ["Software", project.software.join(", ")],
    ["Resolution", project.resolution],
    ["Format", project.format],
  ].filter(([, v]) => v);

  return (
    <section className="container-x pt-12 md:pt-20">
      <motion.nav {...fade(0)} aria-label="Breadcrumb" className="type-eyebrow flex items-center gap-3 text-gray/70">
        <Link href="/portfolio" className="transition-colors hover:text-black">
          Portfolio
        </Link>
        <span>/</span>
        <span className="text-black">{project.category}</span>
      </motion.nav>

      <h1 className="type-h1 mt-8 max-w-5xl">
        <SplitText text={project.title} onLoad />
      </h1>

      <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12">
        <motion.p {...fade(0.35)} className="type-lead text-gray lg:col-span-6">
          {project.shortDescription}
        </motion.p>
        <motion.dl {...fade(0.5)} className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-black/10 pt-8 sm:grid-cols-3 lg:col-span-5 lg:col-start-8 lg:border-t-0 lg:pt-1">
          {details.map(([k, v]) => (
            <div key={k}>
              <dt className="type-eyebrow text-[0.62rem] text-gray/60">{k}</dt>
              <dd className="mt-1.5 text-sm font-semibold text-black">{v}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.div
        initial={{ clipPath: "inset(8% 6% 8% 6% round 28px)", opacity: 0 }}
        animate={loaded ? { clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1 } : {}}
        transition={{ duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-14 aspect-[16/9] overflow-hidden rounded-[28px] bg-soft md:mt-20"
      >
        <Image src={project.thumbnail} alt={project.title} fill priority sizes="(min-width: 1360px) 1250px, 100vw" className="object-cover" />
      </motion.div>
    </section>
  );
}
