import { getAllProjects } from "@/lib/projects";

import Hero from "@/sections/home/Hero";
import WhoWeAre from "@/sections/home/WhoWeAre";
import SelectedWork from "@/sections/home/SelectedWork";
import Disciplines from "@/sections/home/Disciplines";
import ServicesGrid from "@/sections/home/ServicesGrid";
import CtaBand from "@/components/shared/CtaBand";

// HOME PAGE — sections render top to bottom in this order.
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <SelectedWork projects={getAllProjects()} />
      <Disciplines />
      <ServicesGrid />
      <CtaBand />
    </>
  );
}
