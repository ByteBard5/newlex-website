import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";

import { site } from "@/config/site";
import LoaderProvider from "@/components/layout/LoaderProvider";
import Preloader from "@/components/layout/Preloader";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CursorLabel from "@/components/layout/CursorLabel";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

// Manrope — headings (bold and modern)
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

// DM Sans — paragraphs, buttons and navigation
const dmSans = DM_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  // Link previews on WhatsApp, LinkedIn, Facebook, X etc. The picture itself
  // comes from src/app/opengraph-image.jsx and is added to every page automatically.
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  // "summary_large_image" = full-width picture instead of a small square thumbnail
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

export const viewport = {
  themeColor: "#08090b",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable} ${dmSans.variable}`}>
      <head>
        {/* Skip the intro instantly (before first paint) if it already played this visit */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(sessionStorage.getItem('intro-seen')==='1')document.documentElement.classList.add('intro-seen')}catch(e){}",
          }}
        />
      </head>
      <body>
        <LoaderProvider>
          <Preloader />
          <SmoothScroll>
            <CursorLabel />
            <Navbar />
            {/* spacer so content starts below the fixed navigation bar */}
            <div aria-hidden className="h-[72px] md:h-20" />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
          </SmoothScroll>
        </LoaderProvider>
      </body>
    </html>
  );
}
