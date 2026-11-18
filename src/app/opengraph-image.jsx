import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

// ─────────────────────────────────────────────────────────────
//  SHARE PREVIEW IMAGE (all pages)
//  The picture shown when a link to the site is sent on WhatsApp,
//  Instagram DMs, LinkedIn, Facebook, iMessage, Slack, X, etc.
//  Next.js turns this file into a 1200 × 630 PNG at build time and adds
//  the og:image tags to every page automatically. Project pages use their
//  own cover picture instead (see src/app/portfolio/[slug]/page.jsx).
//
//  To change the words: edit the text below, or the tagline in src/config/site.js.
//  Apps cache previews — after a change, a link already shared may keep the old picture.
// ─────────────────────────────────────────────────────────────

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BLACK = "#08090b";
const WHITE = "#f4f2ee";
const YELLOW = "#ffc700";

const SERVICES_LINE = "Brand identity · Social media · Packaging · CGI & 3D";

// Manrope (the heading font), downloaded only for the letters this image uses.
// The image renderer cannot read the .woff2 files the site itself uses.
// If the download fails at build time, the image still builds with the
// renderer's default font rather than breaking the build.
async function loadManrope(text) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Manrope:wght@700&text=${encodeURIComponent(text)}`, {
        // an old browser name makes Google send .woff/.ttf instead of .woff2
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.30 (KHTML, like Gecko) Safari/534.30" },
      })
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:woff|truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [logo, manrope] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/newlex-logo-on-dark.png")),
    loadManrope(site.tagline + SERVICES_LINE + site.url),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const [first, last] = site.tagline.split(/ to /i);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BLACK,
          padding: "64px 72px",
          fontFamily: manrope ? "Manrope" : "sans-serif",
          color: WHITE,
        }}
      >
        {/* logo: 1304 × 419 source, shown at the same ratio */}
        <img src={logoSrc} width={326} height={105} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 92, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            {last ? (
              <>
                <span>{first} to&nbsp;</span>
                <span style={{ color: YELLOW }}>{last}</span>
              </>
            ) : (
              <span>{site.tagline}</span>
            )}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: "#b9b6b0" }}>
            {SERVICES_LINE}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", fontSize: 28 }}>
          <div style={{ width: 48, height: 6, background: YELLOW, marginRight: 20 }} />
          {site.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    // Only pass "fonts" when Manrope loaded: an empty list removes the default font too.
    manrope ? { ...size, fonts: [{ name: "Manrope", data: manrope, weight: 700, style: "normal" }] } : size
  );
}
