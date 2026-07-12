"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ProgressLine() {
  const { progress } = useScrollProgress();

  return (
    <div
      className="fixed left-0 top-0 z-[110] h-[2px] bg-gradient-to-r from-gold to-teal transition-[width] duration-100 ease-linear"
      style={{ width: `${progress}%` }}
    />
  );
}
