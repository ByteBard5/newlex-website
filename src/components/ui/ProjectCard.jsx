import Link from "next/link";
import Image from "@/components/ui/SmartImage";
import { categoryLabel } from "@/lib/projects";

/*
  PROJECT CARD (Portfolio page grid, on black)
  The cover picture (shape 9:7, square corners), then the project name and its category.
  Matches the cards on the reference work page the owner chose.
  Hover only zooms the picture slightly; nothing depends on hover.
*/
export default function ProjectCard({ project, priority = false }) {
  return (
    <Link href={`/portfolio/${project.id}`} data-cursor="View" className="group block">
      <div className="relative aspect-[9/7] overflow-hidden bg-white/5">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="mt-4 text-xl font-medium text-white">{project.title}</h3>
      {project.category && <p className="mt-1.5 text-base text-white/60">{categoryLabel(project.category)}</p>}
    </Link>
  );
}
