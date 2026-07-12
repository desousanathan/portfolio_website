"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { type GitHubRepo } from "@/lib/github";

const accentClass = {
  gold: { border: "hover:border-gold", shadow: "hover:shadow-gold/20", tag: "border-gold text-gold" },
  violet: { border: "hover:border-violet", shadow: "hover:shadow-violet/20", tag: "border-violet text-violet" },
  teal: { border: "hover:border-teal", shadow: "hover:shadow-teal/20", tag: "border-teal text-teal" },
  slate: { border: "hover:border-white/40", shadow: "hover:shadow-white/10", tag: "border-white/40 text-white/70" },
} as const;

interface ProjectCardClientProps {
  repo: GitHubRepo;
  accent: keyof typeof accentClass;
  index: number;
  accentClass: typeof accentClass;
}

export default function ProjectCardClient({
  repo,
  accent,
  index,
  accentClass: accentClassObj,
}: ProjectCardClientProps) {
  const { ref, inView } = useScrollReveal<HTMLDivElement>();
  const colors = accentClassObj[accent];

  return (
    <div
      ref={ref}
      data-in={inView}
      style={{ transitionDelay: `${index * 90}ms` }}
      className={`reveal group flex flex-col gap-3.5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${colors.border} ${colors.shadow}`}
    >
      <div className="flex items-start justify-between gap-2.5">
        <h3 className="font-display text-xl font-semibold text-white">{repo.name}</h3>
        {repo.stargazers_count > 10 && (
          <span className={`rounded-md border px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wide ${colors.tag}`}>
            ⭐ {repo.stargazers_count}
          </span>
        )}
      </div>
      <p className="flex-1 text-sm leading-relaxed text-white/65">
        {repo.description || "No description provided"}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {repo.language && (
          <span className="rounded-md border border-white/15 px-2.5 py-1 font-mono text-[0.68rem] text-white/60">
            {repo.language}
          </span>
        )}
        {repo.topics.slice(0, 3).map((topic) => (
          <span key={topic} className="rounded-md border border-white/15 px-2.5 py-1 font-mono text-[0.68rem] text-white/60">
            {topic}
          </span>
        ))}
      </div>
      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-hover
        className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-white"
      >
        View repo
        <span className="transition-transform group-hover:rotate-45">↗</span>
      </a>
    </div>
  );
}
