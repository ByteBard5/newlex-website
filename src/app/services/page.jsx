import ServicesHero from "@/sections/services/ServicesHero";
import ServiceList from "@/sections/services/ServiceList";
import FaqSection from "@/components/shared/FaqSection";
import CtaBand from "@/components/shared/CtaBand";

export const metadata = {
  title: "Services",
  description: "Brand identity, social media design, CGI & 3D visualisation, packaging, posters and illustration.",
};

// SERVICES PAGE — sections render top to bottom in this order.
export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceList />
      <FaqSection />
      <CtaBand />
    </>
  );
}
