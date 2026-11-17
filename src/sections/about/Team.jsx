import Image from "next/image";
import { team } from "@/content/team";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";

/*
  ABOUT › MEET THE TEAM
  Colour photos with the name and role underneath. On hover (or tap on phones)
  the photo turns black & white and the person's line appears over it.
  Edit people, photos and lines in src/content/team.js
*/
function TeamCard({ m }) {
  return (
    <article tabIndex={0} aria-label={`${m.name}, ${m.role}. “${m.quote}”`} className="group cursor-default">
      <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-[#d8c2b2]">
        <Image
          src={m.image}
          alt=""
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover transition duration-700 ease-out-expo group-hover:scale-[1.04] group-hover:grayscale group-focus:scale-[1.04] group-focus:grayscale"
        />

        {/* the person's line */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100 lg:p-6">
          <span aria-hidden className="font-display text-5xl font-extrabold leading-[0.6] text-yellow">
            &ldquo;
          </span>
          <p className="mt-3 translate-y-3 font-display text-[clamp(1rem,1.55vw,1.4rem)] font-bold leading-snug tracking-[-0.015em] text-white transition-transform duration-500 ease-out-expo group-hover:translate-y-0 group-focus:translate-y-0">
            {m.quote}
          </p>
        </div>
      </div>

      <h3 className="mt-4 font-sans text-[0.9rem] font-semibold uppercase tracking-[0.05em] text-white lg:text-base">{m.name}</h3>
      <p className="mt-0.5 text-[0.9rem] leading-snug text-yellow lg:text-base">{m.role}</p>
    </article>
  );
}

export default function Team() {
  return (
    <section id="team" className="section-y scroll-mt-20 bg-black text-white">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow light>Meet the Team</Eyebrow>
            <h2 className="type-h2 mt-7 text-white">
              <SplitText text="The minds behind the magic." />
            </h2>
          </div>
          <p className="type-lead text-white/65 lg:col-span-5 lg:pb-2">Different talents. Fresh perspectives. One creative team.</p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:mt-20 md:grid-cols-4 md:gap-x-4 lg:gap-x-8 lg:gap-y-14">
          {team.map((m, i) => (
            <Reveal as="li" key={m.name} delay={(i % 4) * 0.08}>
              <TeamCard m={m} />
            </Reveal>
          ))}
        </ul>

        <p className="mt-12 text-center text-sm text-white/40 lg:hidden">Tap a photo to see their line.</p>
      </div>
    </section>
  );
}
