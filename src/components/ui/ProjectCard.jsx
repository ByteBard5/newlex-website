import Link from "next/link";
import Image from "@/components/ui/SmartImage";

/*
  PROJECT CARD (Portfolio page grid)
  A full-bleed image with the project name and a small uppercase line
  ("CATEGORY / ROLE") underneath, as on the reference work page.
  - variant "narrow" is a tall 4:5 image, "wide" a 5:4 image; the grid
    alternates them so the rows stagger.
  - Hover only rounds the corners and slightly zooms the image. Nothing
    important depends on hover, so phones lose nothing.
*/
const SHAPES = {
  narrow: "aspect-[4/5]",
  wide: "aspect-[5/4]",
};

export default function ProjectCard({ project, variant = "wide", sizes, priority = false }) {
  const meta = [project.category, project.role].filter(Boolean).join(" / ");
  return (
    <Link href={`/portfolio/${project.id}`} data-cursor="View" className="group block">
      <div
        className={`relative overflow-hidden bg-soft transition-[border-radius] duration-500 ease-out-expo group-hover:rounded-3xl ${SHAPES[variant]}`}
      >
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes={sizes ?? (variant === "narrow" ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 768px) 58vw, 100vw")}
          priority={priority}
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]"
        />
      </div>

      <h3 className="mt-5 font-display text-xl font-extrabold tracking-tight text-black md:text-2xl">{project.title}</h3>
      {meta && <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.12em] text-gray">{meta}</p>}
    </Link>
  );
}
