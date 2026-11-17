import Image from "@/components/ui/SmartImage";
import { services } from "@/content/services";
import { getProjectsByCategory } from "@/lib/projects";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

/*
  SERVICES › LIST
  One row per service, split by thin rules, following the reference services
  page the owner chose: a large title, a large paragraph and one button on one
  side, a square image on the other. The sides swap every row.
  - Image: the service's own "image" (src/content/services.js) if set,
    otherwise the thumbnail of the first project in the same category.
    A service with neither shows a black panel with its number, so no
    stock photo stands in for work the studio has not shown yet.
  - Edit services in src/content/services.js
*/
export default function ServiceList() {
  return (
    <section className="container-x pb-12 md:pb-20">
      {services.map((s, i) => {
        const image = s.image || getProjectsByCategory(s.category)[0]?.thumbnail;
        const number = String(i + 1).padStart(2, "0");
        const flip = i % 2 === 1;
        return (
          <article
            key={s.slug}
            id={s.slug}
            className="grid scroll-mt-28 items-center gap-10 border-t border-black/10 py-16 md:grid-cols-12 md:gap-8 md:py-24"
          >
            <Reveal className={`md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}>
              <h2 className="font-display text-[clamp(2rem,4.2vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.035em]">{s.title}</h2>
              <p className="mt-6 max-w-2xl text-[clamp(1.125rem,1.9vw,1.6rem)] font-light leading-[1.45] text-black md:mt-8">{s.description}</p>
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.12em] text-gray">{s.deliverables.join(" / ")}</p>
              <div className="mt-8 md:mt-10">
                <Button href={`/contact?service=${s.slug}`} variant="outline" size="sm">
                  Enquire about this
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.1} className={`md:col-span-4 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
              <div className="relative aspect-square overflow-hidden bg-black">
                {image ? (
                  <Image src={image} alt={s.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                ) : (
                  <div className="flex h-full flex-col justify-between p-6 md:p-8">
                    <span className="font-display text-[clamp(4rem,9vw,8rem)] font-extrabold leading-none tracking-[-0.05em] text-yellow">{number}</span>
                    <span className="type-eyebrow text-white/75">{s.title}</span>
                  </div>
                )}
              </div>
            </Reveal>
          </article>
        );
      })}
    </section>
  );
}
