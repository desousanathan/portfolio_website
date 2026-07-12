"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ContactSection() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="contact" className="mx-auto max-w-5xl px-[8vw] py-[90px] text-center">
      <div ref={ref} data-in={inView} className="reveal mx-auto max-w-xl">
        <div className="mb-4 flex items-center justify-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-gold">
          <span className="h-px w-5 bg-gold" /> Contact
        </div>
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          Let&apos;s talk.
        </h2>
        <p className="mt-3.5 leading-relaxed text-white/65">
          Open to internships, collaborations, and interesting problems — cybersecurity or
          full-stack, doesn&apos;t matter which.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a
          href="https://github.com/desousanathan"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="w-[220px] rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold"
        >
          <div className="font-display text-xl font-bold text-gold">GitHub</div>
          <div className="mt-1.5 text-sm text-white/65">github.com/desousanathan</div>
        </a>
        <a
          href="https://www.linkedin.com/in/nathan-de-sousa-b72505347/"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="w-[220px] rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold"
        >
          <div className="font-display text-xl font-bold text-gold">LinkedIn</div>
          <div className="mt-1.5 text-sm text-white/65">Connect with me</div>
        </a>
      </div>
    </section>
  );
}
