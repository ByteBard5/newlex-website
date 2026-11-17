import Link from "next/link";
import RollText from "./RollText";

/*
  Rounded button used across the site.
  variant: "primary" (black, for light backgrounds)
           "accent"  (yellow, for dark backgrounds)
           "outline" | "light" | "outlineLight"
  size:    "sm" | "md"
  Pass href for a link, or type/onClick for a <button>.
*/
const VARIANTS = {
  primary: "bg-black text-white hover:bg-yellow hover:text-black",
  dark: "bg-black text-white hover:bg-yellow hover:text-black",
  accent: "bg-yellow text-black hover:bg-white",
  outline: "border border-black/20 text-black hover:border-black hover:bg-black hover:text-white",
  light: "bg-white text-black hover:bg-yellow",
  outlineLight: "border border-white/30 text-white hover:border-yellow hover:bg-yellow hover:text-black",
};
const SIZES = {
  sm: "h-11 px-5 text-[0.88rem]",
  md: "h-14 px-7 text-[0.98rem]",
};

// ↗ arrow that nudges up-right on hover
function Arrow() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className="transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    >
      <path d="M2 10L10 2M10 2H3.5M10 2V8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Button({ href, children, variant = "primary", size = "md", arrow = true, className = "", ...rest }) {
  const display = /(^|\s)hidden(\s|$)/.test(className) ? "" : "inline-flex";
  const cls = `group ${display} select-none items-center justify-center gap-2.5 rounded-full font-medium tracking-[-0.01em] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  const inner = (
    <>
      <RollText>{children}</RollText>
      {arrow && <Arrow />}
    </>
  );

  if (href && (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:"))) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})} {...rest}>
        {inner}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}
