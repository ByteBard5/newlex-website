import { getAllProjects, getCategories } from "@/lib/projects";
import PortfolioHero from "@/sections/portfolio/PortfolioHero";
import PortfolioGrid from "@/sections/portfolio/PortfolioGrid";
import CtaBand from "@/components/shared/CtaBand";

export const metadata = {
  title: "Portfolio",
  description: "Brand identity, social media and CGI & 3D projects by Newlex Designs.",
};

// PORTFOLIO PAGE — projects come from src/content/projects (one file per project)
export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioGrid projects={getAllProjects()} categories={getCategories()} />
      <CtaBand title="Like what you see?" text="Let's create something just as memorable for your brand." />
    </>
  );
}
