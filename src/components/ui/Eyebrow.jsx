// Small uppercase label shown above headings, with a yellow dot.
// line: adds a short rule after the text (as in the hero).
export default function Eyebrow({ children, light = false, line = false, className = "" }) {
  return (
    <p className={`type-eyebrow flex items-center gap-3 ${light ? "text-white/75" : "text-gray"} ${className}`}>
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow" />
      {children}
      {line && <span className={`ml-2 hidden h-px w-16 sm:block md:w-20 ${light ? "bg-white/35" : "bg-black/25"}`} />}
    </p>
  );
}
