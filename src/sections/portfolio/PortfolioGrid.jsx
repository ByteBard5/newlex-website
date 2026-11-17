"use client";

import { Suspense, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useLenis } from "lenis/react";
import ProjectCard from "@/components/ui/ProjectCard";
import { site } from "@/config/site";

/*
  PORTFOLIO › GRID
  - Layout follows the reference work page the owner chose: two columns of
    alternating narrow and wide project cards, with the name under each image.
  - Filter buttons are created automatically from each project's "category".
  - Shows site.projectsPerPage (10) projects per page, then Previous / Next.
  - The current filter and page are kept in the address bar
    (e.g. /portfolio?category=CGI+%26+3D&page=2) so Back works and links can be shared.
*/
const PER_PAGE = site.projectsPerPage;

function pageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const keep = [...new Set([1, total, current - 1, current, current + 1])].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out = [];
  keep.forEach((n, i) => {
    if (i && n - keep[i - 1] > 1) out.push("…");
    out.push(n);
  });
  return out;
}

function Pagination({ current, pages, onPage }) {
  const base =
    "inline-flex h-11 items-center justify-center rounded-full text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 md:h-12";
  return (
    <nav aria-label="Pagination" className="mt-16 flex flex-wrap items-center justify-center gap-2 border-t border-black/10 pt-10 md:mt-24">
      <button
        type="button"
        onClick={() => onPage(current - 1)}
        disabled={current === 1}
        className={`${base} border border-black/15 px-5 text-black hover:border-black hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-30`}
      >
        ← <span className="ml-2 hidden sm:inline">Previous</span>
      </button>

      {pageList(current, pages).map((n, i) =>
        n === "…" ? (
          <span key={`gap-${i}`} className="px-1 text-gray/50">
            …
          </span>
        ) : (
          <button
            key={n}
            type="button"
            onClick={() => onPage(n)}
            aria-current={n === current ? "page" : undefined}
            className={`${base} w-11 md:w-12 ${n === current ? "bg-black text-white" : "border border-black/15 text-black hover:border-yellow hover:bg-yellow"}`}
          >
            {n}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPage(current + 1)}
        disabled={current === pages}
        className={`${base} border border-black/15 px-5 text-black hover:border-black hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-30`}
      >
        <span className="mr-2 hidden sm:inline">Next</span> →
      </button>
    </nav>
  );
}

function GridView({ projects, categories, filter, page, onFilter, onPage, sectionRef }) {
  const filters = ["ALL", ...categories];
  const filtered = filter === "ALL" ? projects : projects.filter((p) => p.category === filter);
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(Math.max(1, page), pages);
  const start = (current - 1) * PER_PAGE;
  const visible = filtered.slice(start, start + PER_PAGE);

  return (
    <section ref={sectionRef} className="container-x pb-24 md:pb-36">
      {/* Quiet text filters with a sliding underline, so the images stay the loudest thing on the page */}
      <LayoutGroup>
        <div className="mb-12 flex flex-wrap gap-x-8 gap-y-2 border-b border-black/10 md:mb-16">
          {filters.map((f) => {
            const count = f === "ALL" ? projects.length : projects.filter((p) => p.category === f).length;
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => onFilter(f)}
                aria-pressed={active}
                className={`relative min-h-11 pb-3 pt-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                  active ? "text-black" : "text-gray/70 hover:text-black"
                }`}
              >
                {f === "ALL" ? "All work" : f} <span className="opacity-50">{count}</span>
                {active && (
                  <motion.span layoutId="filter" className="absolute inset-x-0 -bottom-px h-0.5 bg-black" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                )}
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      {filtered.length === 0 && <p className="text-gray">No projects in this category yet.</p>}

      {/* Staggered rows: a narrow 4:5 card beside a wide 5:4 card, swapping sides every row
          (narrow-wide, wide-narrow, …). On phones every card is full width. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${filter}-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid gap-y-12 md:grid-cols-12 md:gap-x-8 md:gap-y-24"
        >
          {visible.map((p, i) => {
            const variant = i % 4 === 0 || i % 4 === 3 ? "narrow" : "wide";
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: Math.min(i, 5) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={variant === "narrow" ? "md:col-span-5" : "md:col-span-7"}
              >
                <ProjectCard project={p} variant={variant} priority={i < 2} />
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {pages > 1 && <Pagination current={current} pages={pages} onPage={onPage} />}
    </section>
  );
}

function GridWithUrl(props) {
  const params = useSearchParams();
  const pathname = usePathname();
  const lenis = useLenis();
  const ref = useRef(null);

  const wanted = (params.get("category") || "").toUpperCase();
  const filter = props.categories.includes(wanted) ? wanted : "ALL";
  const page = Math.max(1, parseInt(params.get("page") || "1", 10) || 1);

  const go = ({ nextFilter, nextPage }) => {
    const sp = new URLSearchParams(params.toString());
    if (nextFilter !== undefined) {
      if (nextFilter === "ALL") sp.delete("category");
      else sp.set("category", nextFilter);
      sp.delete("page");
    }
    if (nextPage !== undefined) {
      if (nextPage <= 1) sp.delete("page");
      else sp.set("page", String(nextPage));
    }
    const qs = sp.toString();
    window.history.pushState(null, "", qs ? `${pathname}?${qs}` : pathname);
    if (nextPage !== undefined && ref.current) lenis?.scrollTo(ref.current, { offset: -110, duration: 1 });
  };

  return (
    <GridView
      {...props}
      filter={filter}
      page={page}
      sectionRef={ref}
      onFilter={(f) => go({ nextFilter: f })}
      onPage={(n) => go({ nextPage: n })}
    />
  );
}

export default function PortfolioGrid(props) {
  return (
    <Suspense fallback={<GridView {...props} filter="ALL" page={1} onFilter={() => {}} onPage={() => {}} />}>
      <GridWithUrl {...props} />
    </Suspense>
  );
}
