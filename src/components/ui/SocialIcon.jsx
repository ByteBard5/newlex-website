/*
  SOCIAL ICON — simple line icons for the social links in src/config/site.js,
  picked by the link's label (Instagram, Behance, LinkedIn, Pinterest, Facebook).
  An unknown label falls back to its first letter, so adding a new network never breaks.
  Used by the footer.
*/
const PATHS = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </>
  ),
  Behance: (
    <>
      <path d="M2.5 7.5h4.2a2.2 2.2 0 0 1 0 4.4H2.5zM2.5 11.9h4.8a2.3 2.3 0 0 1 0 4.6H2.5z" />
      <path d="M15 8h5M14 14.2h7a3.5 3.5 0 1 0-1 2.4" />
    </>
  ),
  LinkedIn: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.5 10.5V17M7.5 7.3v.2M11 17v-6.5M11 13.5a2.7 2.7 0 0 1 5.4 0V17" />
    </>
  ),
  Pinterest: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.4 14.6c-.9-.5-1.4-1.5-1.4-2.6 0-2.4 1.9-4.2 4.3-4.2 2.3 0 3.8 1.5 3.8 3.5 0 2.4-1.2 4.2-3 4.2-.9 0-1.5-.7-1.3-1.6l.7-2.6M11.6 12.4 10 19.8" />
    </>
  ),
  Facebook: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 8.2h-1.4a1.8 1.8 0 0 0-1.8 1.8V21M9.8 13h4.6" />
    </>
  ),
};

export default function SocialIcon({ label, className = "h-5 w-5" }) {
  const icon = PATHS[label];
  if (!icon) return <span className="text-sm font-semibold">{label.charAt(0)}</span>;
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {icon}
    </svg>
  );
}
