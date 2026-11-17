import Link from "next/link";
import Image from "@/components/ui/SmartImage";
import Eyebrow from "@/components/ui/Eyebrow";

// PROJECT › NEXT PROJECT — link to the following project.
export default function NextProject({ project }) {
  if (!project) return null;
  return (
    <section className="container-x py-24 md:py-36">
      <Link href={`/portfolio/${project.id}`} data-cursor="View" className="group grid items-center gap-10 border-t border-black/10 pt-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>Next Project</Eyebrow>
          <h2 className="type-h2 mt-6 transition-colors duration-300 group-hover:text-black/70">{project.title}</h2>
          <p className="type-eyebrow mt-4 text-gray/70">{project.category}</p>
          <span className="type-eyebrow mt-8 inline-flex items-center gap-3 text-black">
            View project
            <span className="grid h-11 w-11 place-items-center rounded-full border border-black/15 transition-all duration-300 group-hover:border-yellow group-hover:bg-yellow">
              →
            </span>
          </span>
        </div>
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-soft lg:col-span-7">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
          />
        </div>
      </Link>
    </section>
  );
}
