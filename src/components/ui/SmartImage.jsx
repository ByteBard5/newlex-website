"use client";

import { useState } from "react";
import Image from "next/image";

/*
  next/image with a safety net: images are optimised (smaller, faster) when
  possible, and if optimisation fails (e.g. Cloudflare is slow to respond)
  the original file is loaded directly instead — so nothing is ever blank.
*/
export default function SmartImage({ onError, unoptimized, ...props }) {
  const [direct, setDirect] = useState(false);
  return (
    <Image
      {...props}
      unoptimized={direct || unoptimized}
      onError={(e) => {
        if (!direct) setDirect(true);
        onError?.(e);
      }}
    />
  );
}
