import fs from "node:fs";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";
import { generateProjects, projectsDir } from "./scripts/generate-projects.mjs";

/*
  Next.js settings.
  - images.remotePatterns: project images can live on Cloudflare R2 (any *.r2.dev link)
    or in /public (no setting needed for those).
  - In development, the projects folder is watched: adding, renaming or deleting a
    project file rebuilds the project list straight away, so there is no need to restart.
*/
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "**.r2.dev" }],
    minimumCacheTTL: 2678400,
  },
};

let watching = false;

export default function config(phase) {
  if (phase === PHASE_DEVELOPMENT_SERVER && !watching) {
    watching = true;
    let timer;
    fs.watch(projectsDir, (_event, file) => {
      if (!file || file === "index.js") return;
      clearTimeout(timer);
      timer = setTimeout(() => generateProjects({ quiet: true }), 200);
    });
  }
  return nextConfig;
}
