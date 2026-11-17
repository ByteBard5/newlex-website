import Link from "next/link";
import Image from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import Button from "@/components/ui/Button";
import { site } from "@/config/site";

/*
  HOME › FEATURED WORK — two projects per row, name and category underneath.
  On hover a yellow layer slides over the image with the project name.
  Shows the first site.homeProjects (6) projects, by "order".
*/

// "SOCIAL MEDIA" -> "Social Media", "CGI & 3D" stays as it is
function categoryLabel(category = "") {
  return category
    .split(" ")
    .map((w) => (w.length <= 3 ? w : w[0] + w.slice(1).toLowerCase()))
    .join(" ");
}

function FeaturedCard({ project }) {
  return (
    <Link href={`/portfolio/${project.id}`} className="group block">
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-white/5">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-yellow/90 p-6 text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="translate-y-4 font-display text-[clamp(1.5rem,2.8vw,2.5rem)] font-extrabold leading-tight tracking-[-0.03em] text-black transition-transform duration-500 ease-out-expo group-hover:translate-y-0">
            {project.title}
          </span>
          <span className="translate-y-4 text-sm font-medium text-black/75 transition-transform delay-75 duration-500 ease-out-expo group-hover:translate-y-0">
            View Project ↗
          </span>
        </div>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-bold tracking-[-0.015em] text-white md:text-xl">{project.title}</h3>
        <p className="shrink-0 text-sm italic text-white/55">{categoryLabel(project.category)}</p>
      </div>
    </Link>
  );
}

export default function SelectedWork({ projects }) {
  const shown = projects.slice(0, site.homeProjects);

  return (
    <section className="section-y relative overflow-hidden bg-black text-white">
      <div className="container-x">
        <div className="relative flex flex-col items-center text-center">
          <span
            aria-hidden
            className="text-outline outline-on-dark pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[62%] select-none whitespace-nowrap font-display text-[clamp(4.5rem,17vw,15rem)] font-extrabold leading-none tracking-[-0.05em] text-white/15"
          >
            Featured
          </span>
          <h2 className="type-h2 relative text-white">
            <SplitText text="Featured Work" />
          </h2>
          <p className="relative mt-5 max-w-md text-white/65">A glimpse into the brands and stories we&apos;ve built.</p>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-12 md:mt-24 md:grid-cols-2 md:gap-x-8 md:gap-y-16">
          {shown.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.1}>
              <FeaturedCard project={p} />
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex justify-center md:mt-20">
          <Button href="/portfolio" variant="accent">
            Explore All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
