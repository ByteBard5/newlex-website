// ─────────────────────────────────────────────────────────────
//  TEMPLATE FOR A NEW PROJECT  (files starting with "_" are ignored, like this one)
//
//  1. Put the project's pictures in a new folder:  public/projects/<project-name>/
//       e.g. public/projects/nike-campaign/thumbnail.jpg, 01.jpg, 02.jpg …
//  2. Copy this file, paste it in this same folder and rename the copy,
//       e.g.  nike-campaign.js   (no "_" at the start)
//  3. Change FOLDER below to the folder name, and fill in the details.
//  4. Save. The project appears on the Portfolio page, gets its own page
//     at /portfolio/<slug>, and shows on the Home page if "order" is small.
//
//  Pictures stored on Cloudflare R2 instead? Use the full link, e.g.
//     const FOLDER = "https://pub-4f097b343ff84b1494195f279e309042.r2.dev/NikeCampaign";
// ─────────────────────────────────────────────────────────────

const FOLDER = "/projects/my-new-project";

const projectData = {
  order: 10, // position on the site: 1 = first. Lower numbers show first.
  slug: "My New Project", // the page address: "My New Project" becomes /portfolio/my-new-project
  title: "My New Project",
  // Filter on the Portfolio page. Use the SAME spelling as a service to show
  // this project's picture on the Services page: BRAND IDENTITY, SOCIAL MEDIA,
  // CGI & 3D, PACKAGING, PRINT, ILLUSTRATION
  category: "SOCIAL MEDIA",
  shortDescription: "One or two sentences about the project.",

  // Optional extras for the project page — delete any you don't need
  year: "2026", // shown next to the title
  services: ["Brand Identity", "Packaging Design"], // line under the title
  client: "Who the client is and what they do.", // tab "Client"
  challenge: "What problem the project had to solve.", // tab "Challenges"
  solution: "How the design solved it.", // tab "Solution"
  credits: ["Creative Director: Name", "Designer: Name"], // centred lines under the pictures

  thumbnail: `${FOLDER}/thumbnail.jpg`, // cover picture; keep the subject in the centre

  // Optional — delete these two if the project doesn't have them
  description: "A longer paragraph about the idea, the process and the result.",
  gallery: [`${FOLDER}/gallery01.jpg`, `${FOLDER}/gallery02.jpg`],

  projectType: "SOCIAL MEDIA",
  software: ["Photoshop", "Illustrator"],
  resolution: "1080x1350",
  format: "PNG",
  role: "Visual Designer",

  // Final work — each picture or video fills one screen on the project page, in this order.
  // Pictures: aspectRatio "4/5" for tall ones, or orientation: "landscape" for wide ones.
  // Videos: type "video" with aspectRatio "16/9" (wide) or "9/16" (tall).
  results: [
    { type: "image", src: `${FOLDER}/01.jpg`, aspectRatio: "4/5" },
    { type: "image", src: `${FOLDER}/02.jpg`, orientation: "landscape" },
    { type: "video", src: `${FOLDER}/animation.mp4`, aspectRatio: "16/9" },
  ],
};

export default projectData;
