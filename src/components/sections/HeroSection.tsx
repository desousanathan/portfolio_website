export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-[8vw] pt-[120px]"
    >
      <div className="mb-5 animate-fade-up font-mono text-sm text-white/70 [animation-delay:0.1s] [animation-fill-mode:backwards]">
        Cork, Ireland · Open to opportunities
      </div>

      <h1 className="animate-fade-up font-display text-[clamp(2.6rem,7vw,5.2rem)] font-semibold leading-[1.05] tracking-tight text-white [animation-delay:0.2s] [animation-fill-mode:backwards]">
        Nathan De Sousa,
        <br />
        <span className="bg-gradient-to-r from-gold to-teal bg-clip-text text-transparent">
          builder &amp; breaker
        </span>{" "}
        of systems.
      </h1>

      <p className="mt-4 max-w-xl animate-fade-up text-lg leading-relaxed text-white/75 [animation-delay:0.35s] [animation-fill-mode:backwards]">
        2nd-year Computer Science student at University College Cork, tracking First Class
        Honours. I build full-stack systems by day and pull them apart in CTF competitions on the
        side — currently deep in data pipelines, RAG applications, and low-level systems work.
      </p>

      <div className="mt-11 flex animate-fade-up flex-wrap gap-7 [animation-delay:0.5s] [animation-fill-mode:backwards]">
        {[
          { num: "2", label: "Year / UCC CS" },
          { num: "4", label: "CTF placements" },
          { num: "2", label: "IBM AI certs" },
          { num: "1st", label: "Galway CompSoc CTF" },
        ].map((s) => (
          <div key={s.label} className="font-mono">
            <div className="text-2xl font-bold text-gold">{s.num}</div>
            <div className="mt-0.5 text-[0.7rem] uppercase tracking-[0.08em] text-white/50">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-11 flex animate-fade-up flex-wrap gap-3.5 [animation-delay:0.65s] [animation-fill-mode:backwards]">
        <a
          href="#projects"
          data-cursor-hover
          className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-gold to-gold-dark px-5 py-3 text-sm font-semibold text-ink-void transition-transform hover:-translate-y-0.5"
        >
          View Projects
          <span className="transition-transform group-hover:rotate-45">↗</span>
        </a>
        <a
          href="https://github.com/desousanathan"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="group inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
        >
          GitHub
          <span className="transition-transform group-hover:rotate-45">↗</span>
        </a>
        <a
          href="https://www.linkedin.com/in/nathan-de-sousa-b72505347/"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="group inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
        >
          LinkedIn
          <span className="transition-transform group-hover:rotate-45">↗</span>
        </a>
      </div>

      <div className="absolute bottom-10 left-[8vw] flex items-center gap-2.5 font-mono text-xs text-white/50">
        <span className="h-8 w-px animate-scroll-cue bg-gradient-to-b from-gold to-transparent" />
        Scroll to explore
      </div>
    </section>
  );
}
