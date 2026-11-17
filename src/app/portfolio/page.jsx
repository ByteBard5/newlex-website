import { getAllProjects, getCategories } from "@/lib/projects";
import PortfolioHero from "@/sections/portfolio/PortfolioHero";
import PortfolioGrid from "@/sections/portfolio/PortfolioGrid";

export const metadata = {
  title: "Portfolio",
  description: "Brand identity, social media and CGI & 3D projects by Newlex Designs.",
};

// PORTFOLIO PAGE — structure follows the reference work page the owner chose (studiosixf.com/our-work).
// Projects come from src/content/projects (one file per project).
export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioGrid projects={getAllProjects()} categories={getCategories()} />
    </>
  );
}
