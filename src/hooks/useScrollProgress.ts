"use client";

import { useEffect, useState } from "react";

/**
 * Tracks vertical scroll position (throttled to animation frames) and
 * derives a 0-100 scroll progress percentage. Shared by the top progress
 * line, the nav background-blur toggle, and the parallax background layers.
 */
export function useScrollProgress() {
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollY(y);
      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { scrollY, progress };
}
