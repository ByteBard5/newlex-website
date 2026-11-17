/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Project images are stored on Cloudflare R2
    remotePatterns: [
      { protocol: "https", hostname: "pub-4f097b343ff84b1494195f279e309042.r2.dev" },
      { protocol: "https", hostname: "**.r2.dev" },
    ],
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
