import { notFound } from "next/navigation";
import { getAllProjects, getNextProject, getProject } from "@/lib/projects";
import ProjectHeader from "@/sections/project/ProjectHeader";
import ProjectOverview from "@/sections/project/ProjectOverview";
import ProjectResults from "@/sections/project/ProjectResults";
import ProjectGallery from "@/sections/project/ProjectGallery";
import NextProject from "@/sections/project/NextProject";
import CtaBand from "@/components/shared/CtaBand";

// A page is built automatically for every project file.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: { images: [project.thumbnail] },
  };
}

// PROJECT PAGE — sections hide themselves when the project has no data for them.
export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <ProjectHeader project={project} />
      <ProjectOverview project={project} />
      <ProjectResults project={project} />
      <ProjectGallery project={project} />
      <NextProject project={getNextProject(slug)} />
      <CtaBand />
    </>
  );
}
