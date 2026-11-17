// Text that rolls up to a copy of itself on hover.
// The parent element needs the "group" class OR this works on its own hover.
export default function RollText({ children }) {
  return (
    <span className="group/roll relative inline-flex overflow-hidden align-bottom">
      <span className="block transition-transform duration-500 ease-out-expo group-hover/roll:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover/roll:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}
