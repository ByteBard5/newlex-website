import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { getAllProjects, getNextProject, getPrevProject, getProject } from "@/lib/projects";
import ProjectHeader from "@/sections/project/ProjectHeader";
import ProjectIntro from "@/sections/project/ProjectIntro";
import ProjectMedia from "@/sections/project/ProjectMedia";
import ProjectCredits from "@/sections/project/ProjectCredits";
import ProjectPager from "@/sections/project/ProjectPager";
import ProjectMoreWork from "@/sections/project/ProjectMoreWork";

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
    // Shared links to a project show its own cover picture, title and description.
    // (This replaces the site-wide preview, so the title and description are repeated here.)
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.shortDescription,
      siteName: site.name,
      url: `/portfolio/${slug}`,
      type: "article",
      images: [{ url: project.thumbnail, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${site.name}`,
      description: project.shortDescription,
      images: [project.thumbnail],
    },
  };
}

// PROJECT PAGE — structure follows the reference project page the owner chose.
// Sections hide themselves when the project has no data for them.
export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <ProjectHeader project={project} />
      <ProjectIntro project={project} />
      <ProjectMedia project={project} />
      <ProjectCredits project={project} />
      <ProjectPager prev={getPrevProject(slug)} next={getNextProject(slug)} />
      <ProjectMoreWork projects={getAllProjects().filter((p) => p.id !== slug)} />
    </>
  );
}
