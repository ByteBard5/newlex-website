import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitText from "@/components/ui/SplitText";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/content/services";

// HOME › SERVICES — edit the list in src/content/services.js
export default function ServicesGrid() {
  return (
    <section className="section-y bg-soft">
      <div className="container-x">
        <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>What We Do</Eyebrow>
            <h2 className="type-h2 mt-6 max-w-3xl">
              <SplitText text="Design services built around your brand." />
            </h2>
          </div>
          <Button href="/services" variant="outline">
            All Services
          </Button>
        </div>

        <Reveal>
          <div className="grid border-l border-t border-black/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services#${s.slug}`}
                className="group flex min-h-[19rem] flex-col justify-between border-b border-r border-black/10 p-8 transition-colors duration-500 hover:bg-black md:p-10"
              >
                <span className="type-eyebrow text-black/45 transition-colors duration-500 group-hover:text-yellow">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="type-h3 transition-colors duration-500 group-hover:text-white">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray transition-colors duration-500 group-hover:text-white/70">
                    {s.summary}
                  </p>
                  <span className="type-eyebrow mt-7 inline-flex items-center gap-2 text-black transition-colors duration-500 group-hover:text-yellow">
                    Learn more <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
