const BASE_URL =
  "https://pub-4f097b343ff84b1494195f279e309042.r2.dev";

// The 31 guideline pages are page_01.png … page_31.png
const pages = Array.from({ length: 31 }, (_, i) => ({
  type: "image",
  src: `${BASE_URL}/seyreon-guideline/page_${String(i + 1).padStart(2, "0")}.png`,
  orientation: "landscape",
}));

const projectData = {
  order: 3,
  slug: "Seyreon Guideline",
  title: "Seyreon Guideline",
  category: "BRAND IDENTITY",
  shortDescription:
    "Seyreon is a premium AI-powered technology brand built to redefine the way businesses and individuals interact with digital intelligence. Inspired by the seamless connection between innovation and human creativity, Seyreon is founded on the belief that advanced technology should be intuitive, accessible, and empowering.",

  thumbnail: `${BASE_URL}/seyreon-guideline/thumbnail.png`,

  // No description, no gallery — those sections auto-hide.

  projectType: "Brand Identity",
  software: ["Photoshop", "Illustrator"],
  resolution: "1920x1080",
  format: "PNG",
  role: "Visual Designer",

  results: pages,
};

export default projectData;
