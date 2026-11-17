"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

// On every page change: jump to the top — or to the section in the link (e.g. /about#team).
function ScrollToTopOnRouteChange() {
  const pathname = usePathname();
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    let target = null;
    try {
      if (window.location.hash) target = document.querySelector(decodeURIComponent(window.location.hash));
    } catch {}
    if (target) lenis.scrollTo(target, { offset: -80, immediate: true });
    else lenis.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);
  return null;
}

// Buttery smooth scrolling for the whole site.
export default function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <ScrollToTopOnRouteChange />
      {children}
    </ReactLenis>
  );
}
