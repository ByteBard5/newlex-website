import Link from "next/link";

/*
  PROJECT › PAGER
  A thin rule, then: previous project (left), a grid icon back to all work (centre),
  next project (right). Follows the reference project page the owner chose.
*/
function Arrow({ flip }) {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" aria-hidden className={flip ? "rotate-180" : ""}>
      <path d="M2 2l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function ProjectPager({ prev, next }) {
  return (
    <section className="bg-black text-white">
      <div className="container-x">
        <nav aria-label="More projects" className="grid grid-cols-3 items-center gap-4 border-t border-white/20 py-8">
          <div>
            {prev && (
              <Link href={`/portfolio/${prev.id}`} className="group inline-flex min-h-11 items-center gap-4">
                <Arrow flip />
                <span>
                  <span className="block text-sm text-white/50">Previous</span>
                  <span className="block transition-colors group-hover:text-yellow">{prev.title}</span>
                </span>
              </Link>
            )}
          </div>
          <Link href="/portfolio" aria-label="All projects" className="mx-auto grid h-11 w-11 place-items-center text-white transition-colors hover:text-yellow">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden fill="currentColor">
              {[2, 9, 16].flatMap((x) => [2, 9, 16].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" />))}
            </svg>
          </Link>
          <div className="text-right">
            {next && (
              <Link href={`/portfolio/${next.id}`} className="group inline-flex min-h-11 items-center gap-4 text-right">
                <span>
                  <span className="block text-sm text-white/50">Next</span>
                  <span className="block transition-colors group-hover:text-yellow">{next.title}</span>
                </span>
                <Arrow />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </section>
  );
}
