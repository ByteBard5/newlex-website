"use client";

import { useId } from "react";
import Image from "next/image";

// Slowly rotating circular text with the yellow mark in the middle.
export default function RotatingBadge({ text = "Newlex Designs • Independent Creative Studio • ", className = "" }) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={`relative h-40 w-40 md:h-44 md:w-44 ${className}`}>
      <svg viewBox="0 0 200 200" aria-hidden className="spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id={`badge-${id}`} d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
        </defs>
        <text className="fill-current font-sans text-[13px] font-semibold uppercase" textLength="500" lengthAdjust="spacing">
          <textPath href={`#badge-${id}`}>{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-[27%] grid place-items-center rounded-full bg-black">
        <Image src="/brand/newlex-mark.png" alt="" width={378} height={419} sizes="48px" className="h-auto w-[46%]" />
      </div>
    </div>
  );
}
