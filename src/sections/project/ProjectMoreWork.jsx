"use client";

import Link from "next/link";
import Image from "@/components/ui/SmartImage";
import Marquee from "@/components/ui/Marquee";

/*
  PROJECT › MORE WORK
  "Our Work" heading with an "Explore projects" link, then a slowly moving strip of
  the other projects' covers (each links to its project). Follows the end of the
  reference project page the owner chose.
*/
export default function ProjectMoreWork({ projects }) {
  if (!projects.length) return null;
  return (
    <section className="bg-black pb-20 pt-10 text-white md:pb-28">
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold leading-none tracking-[-0.03em] text-white">
          Our <em className="font-sans font-normal italic text-yellow">Work</em>
        </h2>
        <Link href="/portfolio" className="inline-flex min-h-11 items-center gap-2 text-base uppercase tracking-[0.08em] text-yellow underline-offset-4 hover:underline">
          Explore projects
          <svg width="8" height="12" viewBox="0 0 10 16" aria-hidden>
            <path d="M2 2l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </Link>
      </div>

      <Marquee
        className="mt-10"
        speed={-1.5}
        separator={null}
        items={projects.map((p) => (
          <Link key={p.id} href={`/portfolio/${p.id}`} data-cursor="View" className="relative block aspect-[435/340] w-[260px] overflow-hidden bg-white/5 md:w-[435px]">
            <Image src={p.thumbnail} alt={p.title} fill sizes="(min-width: 768px) 435px, 260px" className="object-cover" />
          </Link>
        ))}
      />
    </section>
  );
}
