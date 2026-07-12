"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const accentClass = {
  gold: "border-l-gold text-gold",
  teal: "border-l-teal text-teal",
  violet: "border-l-violet text-violet",
} as const;

const achievements: { accent: keyof typeof accentClass; title: string; desc: string }[] = [
  {
    accent: "gold",
    title: "1st Place",
    desc: "University of Galway CompSoc CTF — top of the scoreboard.",
  },
  {
    accent: "violet",
    title: "Top 1% Globally",
    desc: "picoCTF 2026, competing against thousands of entrants worldwide.",
  },
  {
    accent: "teal",
    title: "16th Place",
    desc: "ZeroDays CTF, Dublin — finished in the top bracket.",
  },
  {
    accent: "teal",
    title: "2x Competitor",
    desc: "IRLCPC — Irish Collegiate Programming Contest, two appearances.",
  },
];

function AchievementCard({
  accent,
  title,
  desc,
  index,
}: {
  accent: keyof typeof accentClass;
  title: string;
  desc: string;
  index: number;
}) {
  const { ref, inView } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-in={inView}
      style={{ transitionDelay: `${index * 90}ms` }}
      className={`reveal rounded-xl border border-l-[3px] border-white/10 bg-white/[0.03] p-6 transition-transform duration-300 hover:-translate-y-1 ${accentClass[accent]}`}
    >
      <h4 className="font-display text-lg font-semibold text-white">{title}</h4>
      <p className="mt-1.5 text-sm leading-relaxed text-white/65">{desc}</p>
    </div>
  );
}

export function AchievementsSection() {
  const { ref: headRef, inView: headIn } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="achievements" className="mx-auto max-w-5xl px-[8vw] py-[90px]">
      <div ref={headRef} data-in={headIn} className="reveal mb-14 max-w-xl">
        <div className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-gold">
          <span className="h-px w-5 bg-gold" /> Achievements
        </div>
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          Competitive results.
        </h2>
        <p className="mt-3.5 leading-relaxed text-white/65">
          CTFs and programming contests I&apos;ve competed in — the scoreboard doesn&apos;t lie.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {achievements.map((a, i) => (
          <AchievementCard key={a.title} index={i} {...a} />
        ))}
      </div>
    </section>
  );
}
