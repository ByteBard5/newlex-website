import { approach } from "@/content/studio";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";

// ABOUT › APPROACH — edit in src/content/studio.js
export default function Approach() {
  return (
    <section className="section-y bg-soft">
      <div className="container-x">
        <div className="mb-14 grid gap-6 md:mb-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Our Approach</Eyebrow>
          </div>
          <h2 className="type-h2 lg:col-span-8">
            <SplitText text="Design with purpose, crafted to be remembered." />
          </h2>
        </div>
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          {approach.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.1} className="border-t border-black/15 pt-8">
              <span className="type-eyebrow text-black/45">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="type-h3 mt-6">{a.title}</h3>
              <p className="mt-4 leading-relaxed text-gray">{a.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
