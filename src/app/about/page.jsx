import AboutHero from "@/sections/about/AboutHero";
import OurStory from "@/sections/about/OurStory";
import Team from "@/sections/about/Team";
import Philosophy from "@/sections/about/Philosophy";
import CtaBand from "@/components/shared/CtaBand";

export const metadata = {
  title: "About",
  description:
    "Two siblings, one childhood dream. Meet the team behind Newlex Designs — an independent creative studio where ideas grow, imagination leads, and every design tells a story.",
};

// ABOUT PAGE — sections render top to bottom in this order.
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <Team />
      <Philosophy />
      <CtaBand
        eyebrow="Let's connect"
        title="Good things happen when creative minds connect."
        text="Let's make something worth remembering."
        buttonLabel="Let's Work Together"
      />
    </>
  );
}
