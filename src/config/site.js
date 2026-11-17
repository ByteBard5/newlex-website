// ─────────────────────────────────────────────────────────────
//  SITE SETTINGS
//  Brand name, tagline, contact details and social links.
//  Everything on the website reads from this one file.
//  Leave a value empty ("") to hide it.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Newlex Designs",
  tagline: "Unseen to Unforgettable",
  description:
    "Newlex Designs is a creative design studio crafting brand identities, social media campaigns, packaging and photoreal CGI & 3D visuals — taking ideas from unseen to unforgettable.",
  url: "https://newlexdesigns.com",

  // Public contact details shown on the website
  email: "hello@newlexdesigns.com",
  phone: "",
  location: "India · Working worldwide",
  availability: "Open for new projects",

  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Behance", href: "https://www.behance.net/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],

  // How many projects to show
  homeProjects: 6, // on the Home page
  projectsPerPage: 10, // on each Portfolio page (then Previous / Next)

  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ],
};
