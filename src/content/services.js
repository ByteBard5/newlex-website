// ─────────────────────────────────────────────────────────────
//  SERVICES — shown on the Home page, the Services page and the footer.
//  "category" links a service to projects with the same category
//  (e.g. "CGI & 3D") so related work appears automatically.
//
//  image: the square picture on the Services page.
//    Put the file in /public/services/ and write its name here,
//    e.g.  image: "/services/packaging.jpg"
//    Leave it as "" to use the cover of the first project with the same
//    category instead (or a black panel with the number if there is none).
// ─────────────────────────────────────────────────────────────

export const services = [
  {
    slug: "brand-identity",
    title: "Brand Identity",
    category: "BRAND IDENTITY",
    image: "",
    summary: "Logos, visual systems and brand guidelines that give your business a clear, confident presence.",
    description:
      "We build complete visual identities — from the logo and colour palette to typography, imagery and brand guidelines — so every touchpoint looks and feels unmistakably yours.",
    deliverables: ["Logo design", "Colour & typography", "Brand guidelines", "Stationery & collateral", "Brand refresh"],
  },
  {
    slug: "social-media",
    title: "Social Media Design",
    category: "SOCIAL MEDIA",
    image: "",
    summary: "Campaign creatives and post systems designed to stop the scroll and strengthen your brand.",
    description:
      "Campaign visuals, carousels, stories and ad creatives that are on-brand, high-impact and built for each platform — designed to be noticed, shared and remembered.",
    deliverables: ["Campaign creatives", "Posts & carousels", "Stories & reel covers", "Ad creatives", "Content templates"],
  },
  {
    slug: "cgi-3d",
    title: "CGI & 3D Visualisation",
    category: "CGI & 3D",
    image: "",
    summary: "Photoreal 3D environments, product visuals and CGI ads that feel larger than life.",
    description:
      "Realistic 3D environments, product visualisation and CGI advertising created in Blender — modelled, lit, textured and rendered for launches, campaigns and social content.",
    deliverables: ["Product visualisation", "3D environments", "CGI advertising", "3D animation", "Renders & stills"],
  },
  {
    slug: "packaging",
    title: "Packaging Design",
    category: "PACKAGING",
    image: "",
    summary: "Packaging that earns attention on the shelf and feels premium in the hand.",
    description:
      "From concept and structure to dielines and print-ready files, we design packaging that tells your product's story and stands out in a crowded market.",
    deliverables: ["Label & box design", "Dielines & print files", "Packaging ranges", "3D packaging mockups", "Print supervision"],
  },
  {
    slug: "posters-print",
    title: "Posters & Print",
    category: "PRINT",
    image: "",
    summary: "Posters, brochures and print collateral with strong typography and a clear message.",
    description:
      "Event posters, brochures, catalogues, menus and large-format print — typography-led layouts with impact, prepared properly for any printer.",
    deliverables: ["Posters & flyers", "Brochures & catalogues", "Menus", "Large-format print", "Print-ready artwork"],
  },
  {
    slug: "illustration",
    title: "Illustration",
    category: "ILLUSTRATION",
    image: "",
    summary: "Custom illustration that gives your brand a distinctive visual voice.",
    description:
      "Bespoke illustrations for brands, packaging, campaigns and editorial use — artwork that makes your brand recognisable at a glance.",
    deliverables: ["Brand illustration", "Packaging artwork", "Icons & patterns", "Editorial illustration", "Character design"],
  },
];
