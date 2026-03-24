"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Multiple approaches for cross-browser/mobile compatibility
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [pathname]);

  return null;
}
