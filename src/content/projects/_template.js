// ─────────────────────────────────────────────────────────────
//  TEMPLATE FOR A NEW PROJECT
//  1. Copy this file and rename it, e.g.  my-new-project.js
//     (files that start with "_" are ignored, like this one)
//  2. Fill in the details below.
//  3. Save. The project appears on the Portfolio page, gets its own
//     page, and (if "order" is small) shows on the Home page too.
// ─────────────────────────────────────────────────────────────

const BASE_URL =
  "https://pub-4f097b343ff84b1494195f279e309042.r2.dev";

const projectData = {
  order: 10, // lower numbers show first
  slug: "My New Project", // used to build the page address
  title: "My New Project",
  category: "SOCIAL MEDIA", // e.g. SOCIAL MEDIA, CGI & 3D, BRAND IDENTITY, PACKAGING
  shortDescription: "One or two sentences about the project.",

  thumbnail: `${BASE_URL}/MyFolder/thumbnail.png`,

  // Optional — delete these two if the project doesn't have them
  description: "A longer paragraph about the idea, the process and the result.",
  gallery: [
    `${BASE_URL}/MyFolder/gallery01.png`,
    `${BASE_URL}/MyFolder/gallery02.png`,
  ],

  projectType: "SOCIAL MEDIA",
  software: ["Photoshop", "Illustrator"],
  resolution: "1080x1350",
  format: "PNG",
  role: "Visual Designer",

  // Final deliverables. Images: give aspectRatio ("4/5") or orientation: "landscape".
  // Videos: type "video" with an aspectRatio ("16/9" or "9/16").
  results: [
    { type: "image", src: `${BASE_URL}/MyFolder/01.png`, aspectRatio: "4/5" },
    { type: "image", src: `${BASE_URL}/MyFolder/02.png`, orientation: "landscape" },
    { type: "video", src: `${BASE_URL}/MyFolder/animation.mp4`, aspectRatio: "16/9" },
  ],
};

export default projectData;
