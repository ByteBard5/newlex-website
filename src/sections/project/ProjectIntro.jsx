"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

/*
  PROJECT › INTRO
  Left: the short description. Right: tabs (Overview / Client / Challenges / Solution)
  showing whichever of those texts the project has: description, client, challenge, solution.
  With no tab texts, the short description sits on its own.
  Structure follows the reference project page the owner chose.
*/
export default function ProjectIntro({ project }) {
  const tabs = [
    ["Overview", project.description],
    ["Client", project.client],
    ["Challenges", project.challenge],
    ["Solution", project.solution],
  ].filter(([, text]) => text);
  const [active, setActive] = useState(0);

  if (!project.shortDescription && !tabs.length) return null;

  return (
    <section className="bg-black text-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        {project.shortDescription && (
          <Reveal>
            <p className="text-[clamp(1.125rem,1.5vw,1.3rem)] font-light leading-relaxed text-white">{project.shortDescription}</p>
          </Reveal>
        )}

        {tabs.length > 0 && (
          <Reveal delay={0.1}>
            <div role="tablist" aria-label="About the project" className="flex flex-wrap gap-x-8 gap-y-2">
              {tabs.map(([label], i) => (
                <button
                  key={label}
                  type="button"
                  role="tab"
                  id={`tab-${i}`}
                  aria-selected={active === i}
                  aria-controls="tab-panel"
                  onClick={() => setActive(i)}
                  className={`min-h-11 text-lg font-medium transition-colors ${active === i ? "text-yellow" : "text-white hover:text-yellow"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p id="tab-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-5 text-[1.05rem] font-light leading-relaxed text-white/90">
              {tabs[active][1]}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
