"use client";

import { useState } from "react";
import Image from "@/components/ui/SmartImage";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import AutoVideo from "@/components/ui/AutoVideo";
import Lightbox from "@/components/ui/Lightbox";

/*
  PROJECT › RESULTS — the final deliverables from the project's "results".
  - portrait images sit side by side in a grid
  - landscape images: the first one full width, the rest two per row
  - videos keep their aspect ratio ("16/9" full width, "9/16" centred)
  Click any image to open it full screen.
*/
function buildBlocks(results) {
  const blocks = [];
  let portraits = null;
  let wideRun = null;
  for (const r of results) {
    if (r.type === "video") {
      portraits = null;
      wideRun = null;
      blocks.push({ kind: "video", item: r });
    } else if (!r.landscape) {
      wideRun = null;
      if (!portraits) blocks.push((portraits = { kind: "portraits", items: [] }));
      portraits.items.push(r);
    } else {
      portraits = null;
      if (!wideRun) {
        blocks.push({ kind: "wide", item: r });
        blocks.push((wideRun = { kind: "wideGrid", items: [] }));
      } else wideRun.items.push(r);
    }
  }
  return blocks.filter((b) => !(b.kind === "wideGrid" && b.items.length === 0));
}

const COLS = { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" };

function Clickable({ src, onOpen, children }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(src)}
      className="group relative block w-full overflow-hidden rounded-2xl bg-soft text-left"
      aria-label="Open image full screen"
    >
      {children}
      <span className="pointer-events-none absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-black opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100">
        ⤢
      </span>
    </button>
  );
}

export default function ProjectResults({ project }) {
  const [open, setOpen] = useState(null);
  if (!project.results.length) return null;

  const images = project.results.filter((r) => r.type !== "video").map((r) => r.src);
  const videoCount = project.results.length - images.length;
  const openImage = (src) => setOpen(images.indexOf(src));
  const blocks = buildBlocks(project.results);
  const summary = [
    images.length && `${images.length} ${images.length === 1 ? "image" : "images"}`,
    videoCount && `${videoCount} ${videoCount === 1 ? "video" : "videos"}`,
    project.resolution,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <section className="container-x pt-24 md:pt-32">
      <div className="grid gap-8 border-t border-black/10 pt-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>Final Output</Eyebrow>
        </div>
        <p className="text-gray lg:col-span-8">{summary}</p>
      </div>

      <div className="mt-12 space-y-6 md:space-y-8">
        {blocks.map((b, bi) => {
          if (b.kind === "video") {
            const vertical = (b.item.ratio ?? 1.78) < 1;
            return (
              <Reveal key={bi} className={vertical ? "mx-auto max-w-[440px]" : ""}>
                <div className="overflow-hidden rounded-2xl bg-black" style={{ aspectRatio: b.item.aspectRatio?.replace("/", " / ") || "16 / 9" }}>
                  <AutoVideo src={b.item.src} poster={vertical ? undefined : project.thumbnail} controls className="h-full w-full object-cover" />
                </div>
              </Reveal>
            );
          }
          if (b.kind === "portraits") {
            const n = Math.min(b.items.length % 3 === 0 ? 3 : b.items.length === 4 ? 4 : Math.min(b.items.length, 3), 4);
            return (
              <div key={bi} className={`grid gap-6 md:gap-8 ${COLS[n]}`}>
                {b.items.map((r, k) => (
                  <Reveal key={r.src} delay={(k % 3) * 0.08}>
                    <Clickable src={r.src} onOpen={openImage}>
                      <div className="relative" style={{ aspectRatio: r.aspectRatio?.replace("/", " / ") || "4 / 5" }}>
                        <Image src={r.src} alt={`${project.title} — ${k + 1}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]" />
                      </div>
                    </Clickable>
                  </Reveal>
                ))}
              </div>
            );
          }
          if (b.kind === "wide") {
            return (
              <Reveal key={bi}>
                <Clickable src={b.item.src} onOpen={openImage}>
                  <Image src={b.item.src} alt={project.title} width={1920} height={1080} sizes="(min-width: 1360px) 1250px, 100vw" className="h-auto w-full" />
                </Clickable>
              </Reveal>
            );
          }
          return (
            <div key={bi} className="grid gap-6 sm:grid-cols-2 md:gap-8">
              {b.items.map((r, k) => (
                <Reveal key={r.src} delay={(k % 2) * 0.08}>
                  <Clickable src={r.src} onOpen={openImage}>
                    <Image src={r.src} alt={project.title} width={1920} height={1080} sizes="(min-width: 640px) 50vw, 100vw" className="h-auto w-full" />
                  </Clickable>
                </Reveal>
              ))}
            </div>
          );
        })}
      </div>

      <Lightbox images={images} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </section>
  );
}
