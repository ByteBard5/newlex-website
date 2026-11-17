import { site, whatsappHref } from "@/config/site";

/*
  WHATSAPP BUTTON — fixed to the bottom-right corner of every page (added in app/layout.jsx).
  Opens a WhatsApp chat with the studio, with a short message already typed.
  The number and message are set in src/config/site.js (whatsapp / whatsappMessage);
  an empty number hides the button.
  It uses WhatsApp's own green so visitors recognise it at a glance.
  It sits below the navigation layer (z-40 < z-50), so the mobile menu covers it when open.
*/
export default function WhatsAppButton() {
  if (!whatsappHref) return null;
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${site.name} on WhatsApp`}
      title="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(8,9,11,0.45)] transition-transform duration-300 hover:scale-105 focus-visible:scale-105 motion-reduce:transition-none md:bottom-8 md:right-8 md:h-16 md:w-16"
    >
      <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7 md:h-8 md:w-8" fill="currentColor">
        <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.54 1.74 6.51L3 29l6.66-1.74A12.97 12.97 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.8c-1.98 0-3.92-.53-5.62-1.54l-.4-.24-3.95 1.03 1.05-3.85-.26-.4A10.76 10.76 0 0 1 5.2 16c0-5.97 4.86-10.82 10.84-10.82 5.96 0 10.8 4.85 10.8 10.82 0 5.96-4.84 10.8-10.8 10.8Zm5.93-8.1c-.33-.16-1.93-.95-2.23-1.06-.3-.11-.52-.16-.73.17-.22.32-.84 1.05-1.03 1.27-.19.22-.38.24-.7.08-.33-.16-1.38-.51-2.62-1.62-.97-.86-1.62-1.93-1.81-2.25-.19-.33-.02-.5.14-.66.15-.15.33-.38.49-.57.16-.19.22-.33.33-.54.1-.22.05-.41-.03-.57-.08-.16-.73-1.76-1-2.41-.27-.63-.54-.55-.73-.56h-.63c-.22 0-.57.08-.87.41-.3.32-1.14 1.11-1.14 2.71s1.17 3.15 1.33 3.36c.16.22 2.3 3.5 5.56 4.91.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.63-.09 1.93-.79 2.2-1.55.27-.76.27-1.41.19-1.55-.08-.13-.3-.21-.62-.37Z" />
      </svg>
    </a>
  );
}
