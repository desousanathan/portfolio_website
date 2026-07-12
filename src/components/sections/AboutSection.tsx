"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

type Tier = "core" | "proficient" | "familiar";

const tierStyles: Record<Tier, string> = {
  core: "border-gold/50 text-gold bg-gold/10 hover:bg-gold/20",
  proficient: "border-teal/50 text-teal bg-teal/10 hover:bg-teal/20",
  familiar: "border-violet/50 text-violet bg-violet/10 hover:bg-violet/20",
};

const tierDot: Record<Tier, string> = {
  core: "bg-gold",
  proficient: "bg-teal",
  familiar: "bg-violet",
};

const groups: { title: string; skills: { name: string; tier: Tier }[] }[] = [
  {
    title: "Languages",
    skills: [
      { name: "Java", tier: "core" },
      { name: "Python", tier: "core" },
      { name: "JavaScript / TypeScript", tier: "proficient" },
      { name: "C", tier: "familiar" },
    ],
  },
  {
    title: "Frameworks & Data",
    skills: [
      { name: "React / Next.js", tier: "core" },
      { name: "Scrapy", tier: "proficient" },
      { name: "Node.js / Express", tier: "proficient" },
      { name: "MongoDB", tier: "proficient" },
      { name: "FastAPI", tier: "familiar" },
    ],
  },
  {
    title: "Security & Systems",
    skills: [
      { name: "CTF / Exploitation", tier: "core" },
      { name: "Networking (TCP/UDP)", tier: "proficient" },
      { name: "Linux / Tooling", tier: "proficient" },
    ],
  },
];

function SkillGroup({ title, skills }: { title: string; skills: { name: string; tier: Tier }[] }) {
  const { ref, inView } = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} data-in={inView} className="reveal mb-11">
      <h3 className="mb-5 font-mono text-[0.8rem] uppercase tracking-[0.1em] text-white/50">
        {title}
      </h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((s) => (
          <span
            key={s.name}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5",
              tierStyles[s.tier]
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", tierDot[s.tier])} />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function AboutSection() {
  const { ref: headRef, inView: headIn } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="skills" className="mx-auto max-w-5xl px-[8vw] py-[150px] sm:py-[90px]">
      <div ref={headRef} data-in={headIn} className="reveal mb-14 max-w-xl">
        <div className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-gold">
          <span className="h-px w-5 bg-gold" /> About
        </div>
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          What I actually work with.
        </h2>
        <p className="mt-3.5 leading-relaxed text-white/65">
          Grouped by how I use them day to day, not ranked by arbitrary percentages. Gold marks
          what I reach for first, teal is solid working knowledge, violet is still growing.
        </p>
      </div>

      {groups.map((g) => (
        <SkillGroup key={g.title} title={g.title} skills={g.skills} />
      ))}
    </section>
  );
}
