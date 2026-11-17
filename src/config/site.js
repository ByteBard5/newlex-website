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

  // WhatsApp chat button (bottom-right of every page) and the contact page.
  // Country code + number, digits only (91 = India). Leave "" to hide the button.
  whatsapp: "917906052779",
  // Text already typed in the chat when a visitor taps the button (they can change it before sending)
  whatsappMessage: "Hi Newlex Designs, I'd like to talk about a project.",
  location: "India · Working worldwide",
  availability: "Open for new projects",

  // Social links — shown as icons at the very bottom of the footer and as links on the Contact page.
  // Replace each href with your own profile link (e.g. "https://www.instagram.com/newlexdesigns/").
  // Icons exist for: Instagram, Behance, LinkedIn, Pinterest, Facebook. Delete a line to hide it.
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Behance", href: "https://www.behance.net/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
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

// Link that opens a WhatsApp chat with the studio (used by the floating button and the contact page)
export const whatsappHref = site.whatsapp
  ? `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(site.whatsappMessage || "")}`
  : "";
