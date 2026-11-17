// ─────────────────────────────────────────────────────────────
//  HOME HERO — the headline and the moving photo wall behind it.
//
//  CHANGING THE PHOTOS
//  • Easiest: replace the files in /public/hero/ with your own photos,
//    keeping the same file names (01.jpg, 02.jpg …). No code changes.
//  • Or edit the list below: add, remove or reorder lines.
//    Local files:      "/hero/my-photo.jpg"   (put the file in /public/hero/)
//    Cloudflare R2:    "https://pub-4f097b343ff84b1494195f279e309042.r2.dev/Folder/image.png"
//  Tips: use 12 or more photos so nothing repeats on screen at the same time.
//        Landscape photos around 1400px wide look best.
//
//  The current photos are free placeholders from Unsplash (unsplash.com/license).
// ─────────────────────────────────────────────────────────────

export const heroImages = [
  "/hero/01.jpg",
  "/hero/02.jpg",
  "/hero/03.jpg",
  "/hero/04.jpg",
  "/hero/05.jpg",
  "/hero/06.jpg",
  "/hero/07.jpg",
  "/hero/08.jpg",
  "/hero/09.jpg",
  "/hero/10.jpg",
  "/hero/11.jpg",
  "/hero/12.jpg",
  "/hero/13.jpg",
  "/hero/14.jpg",
  "/hero/15.jpg",
  "/hero/16.jpg",
  "/hero/17.jpg",
  "/hero/18.jpg",
];

// Time between each rearrangement of the wall, in milliseconds (smaller = faster, bigger = calmer).
export const heroSpeed = 1600;

// The text over the photos.
export const hero = {
  eyebrow: "Independent Creative Studio",
  title: "From unseen to",
  accent: "unforgettable.", // shown in yellow
  text: "We create identities, visuals, and digital experiences that make brands stand apart.",
  primary: { label: "Explore Our Work", href: "/portfolio" },
  secondary: { label: "About the Studio", href: "/about" },
};
