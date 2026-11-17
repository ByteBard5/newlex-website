"use client";

import { useState } from "react";
import Image from "@/components/ui/SmartImage";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Lightbox from "@/components/ui/Lightbox";

// PROJECT › GALLERY — shown only when the project has a "gallery". Click to enlarge.
export default function ProjectGallery({ project }) {
  const [open, setOpen] = useState(null);
  const images = project.gallery;
  if (!images.length) return null;

  return (
    <section className="container-x pt-24 md:pt-32">
      <div className="grid gap-8 border-t border-black/10 pt-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>Gallery</Eyebrow>
        </div>
        <p className="text-gray lg:col-span-8">Stills and details from the project.</p>
      </div>

      <div className="mt-12 columns-1 gap-6 sm:columns-2 md:gap-8">
        {images.map((src, i) => (
          <Reveal key={src} delay={(i % 2) * 0.08} className="mb-6 break-inside-avoid md:mb-8">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label="Open image full screen"
              className="group relative block w-full overflow-hidden rounded-2xl bg-soft"
            >
              <Image
                src={src}
                alt={`${project.title} — gallery ${i + 1}`}
                width={1600}
                height={1000}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
              />
            </button>
          </Reveal>
        ))}
      </div>

      <Lightbox images={images} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </section>
  );
}
