import Marquee from "@/components/ui/Marquee";
import { services } from "@/content/services";

// HOME › DISCIPLINES — a slow scrolling strip of what the studio does.
export default function Disciplines() {
  return (
    <section aria-label="Disciplines" className="border-y border-black/[0.08] py-8 md:py-10">
      <Marquee
        items={services.map((s) => s.title)}
        speed={-1.4}
        separator={<span className="mx-2 inline-block h-2.5 w-2.5 rounded-full bg-yellow md:h-3 md:w-3" />}
        sepClassName=""
        className="font-display text-[clamp(1.8rem,4vw,3.6rem)] font-bold tracking-[-0.03em] text-black"
      />
    </section>
  );
}
