"use client";

import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const links = [
  { href: "#skills", label: "Skills" },
  { href: "#achievements", label: "Achievements" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Site" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const { scrollY } = useScrollProgress();
  const scrolled = scrollY > 30;

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-[100] flex items-center justify-between px-[6vw] transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-ink-void/55 py-3.5 backdrop-blur-xl"
          : "border-b border-transparent py-5"
      )}
    >
      <span className="font-display text-base font-semibold tracking-tight text-white">
        Nathan De Sousa
      </span>
      <div className="hidden gap-8 text-sm text-white/70 sm:flex">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            data-cursor-hover
            className="group relative transition-colors hover:text-white"
          >
            {l.label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>
    </nav>
  );
}
