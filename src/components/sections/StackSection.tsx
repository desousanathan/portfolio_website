"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const stack: { name: string; role: string }[] = [
  { name: "Next.js 15", role: "App Router, React Server Components" },
  { name: "TypeScript", role: "Type safety across the app" },
  { name: "Tailwind CSS", role: "Utility-first styling & design tokens" },
  { name: "React 19", role: "Component model, hooks" },
  { name: "SVG + Canvas-free animation", role: "The parallax landscape background" },
  { name: "IntersectionObserver API", role: "Scroll-triggered reveal animations" },
];

export function StackSection() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="stack" className="mx-auto max-w-5xl px-[8vw] py-[90px]">
      <div
        ref={ref}
        data-in={inView}
        className="reveal rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10"
      >
        <div className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-teal">
          <span className="h-px w-5 bg-teal" /> About This Site
        </div>
        <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
          Built from scratch, no template.
        </h2>
        <p className="mt-3.5 max-w-2xl leading-relaxed text-white/65">
          This portfolio is a hand-built Next.js app — the animated daytime landscape behind
          everything you&apos;re scrolling through is layered SVG and CSS, not a video or image
          file, so it stays sharp at any screen size and costs almost nothing to load.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((s) => (
            <div
              key={s.name}
              className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3.5 transition-colors hover:border-teal/40"
            >
              <div className="font-display text-sm font-semibold text-white">{s.name}</div>
              <div className="mt-1 font-mono text-[0.72rem] text-white/50">{s.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
