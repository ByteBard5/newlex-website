import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

// PROJECT › OVERVIEW — shown only when the project has a "description".
export default function ProjectOverview({ project }) {
  if (!project.description) return null;
  return (
    <section className="container-x pt-24 md:pt-32">
      <div className="grid gap-8 border-t border-black/10 pt-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>Overview</Eyebrow>
        </div>
        <Reveal className="lg:col-span-8">
          <p className="text-[clamp(1.1rem,1.5vw,1.35rem)] leading-[1.8] text-gray">{project.description}</p>
        </Reveal>
      </div>
    </section>
  );
}
