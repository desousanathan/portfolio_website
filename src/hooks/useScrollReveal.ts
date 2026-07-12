"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref to attach to an element and a boolean that flips to true
 * the first time that element scrolls into view. Used to drive the
 * `.reveal` fade/slide-up animation defined in globals.css.
 */
export function useScrollReveal<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
