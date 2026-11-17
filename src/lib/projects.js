import projects from "@/content/projects";

/*
  Reads every project file in src/content/projects and prepares it for the site:
  - builds a URL-friendly id from the slug ("CGI Realism" -> "cgi-realism")
  - makes file links with spaces safe to load
  - sorts by "order"
*/

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function safeUrl(url) {
  if (!url) return url;
  try {
    return encodeURI(decodeURI(url));
  } catch {
    return encodeURI(url);
  }
}

function ratioOf(value) {
  if (!value) return null;
  const [a, b] = String(value).split("/").map(Number);
  return b ? a / b : a || null;
}

function normalize(p, i) {
  const results = (p.results || []).map((r) => {
    const ratio = ratioOf(r.aspectRatio);
    return {
      ...r,
      type: r.type || "image",
      src: safeUrl(r.src),
      ratio,
      landscape: r.orientation === "landscape" || (ratio !== null && ratio >= 1),
    };
  });

  return {
    ...p,
    id: slugify(p.slug || p.title),
    order: typeof p.order === "number" ? p.order : 100 + i,
    title: p.title || p.slug,
    category: String(p.category || "").toUpperCase(),
    thumbnail: safeUrl(p.thumbnail),
    gallery: (p.gallery || []).map(safeUrl),
    software: p.software || [],
    results,
  };
}

const ALL = projects.map(normalize).sort((a, b) => a.order - b.order);

export const getAllProjects = () => ALL;

export const getProject = (id) => ALL.find((p) => p.id === id) ?? null;

export function getNextProject(id) {
  const i = ALL.findIndex((p) => p.id === id);
  return ALL[(i + 1) % ALL.length];
}

export const getCategories = () => [...new Set(ALL.map((p) => p.category).filter(Boolean))];

export const getProjectsByCategory = (category) => ALL.filter((p) => p.category === String(category).toUpperCase());

// The first project that has a video — used for the showreel on the Home page.
export const getShowreelProject = () => ALL.find((p) => p.results.some((r) => r.type === "video" && (r.ratio ?? 1) >= 1)) ?? null;
