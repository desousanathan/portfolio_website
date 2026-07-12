import { fetchGitHubRepos, getLanguageColor, type GitHubRepo } from "@/lib/github";
import ProjectCardClient from "./ProjectCard";

const accentClass = {
  gold: { border: "hover:border-gold", shadow: "hover:shadow-gold/20", tag: "border-gold text-gold" },
  violet: { border: "hover:border-violet", shadow: "hover:shadow-violet/20", tag: "border-violet text-violet" },
  teal: { border: "hover:border-teal", shadow: "hover:shadow-teal/20", tag: "border-teal text-teal" },
  slate: { border: "hover:border-white/40", shadow: "hover:shadow-white/10", tag: "border-white/40 text-white/70" },
} as const;

function ProjectHeading() {
  return (
    <div className="reveal mb-14 max-w-xl" data-in="true">
      <div className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-gold">
        <span className="h-px w-5 bg-gold" /> Projects
      </div>
      <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
        Things I&apos;ve shipped.
      </h2>
      <p className="mt-3.5 leading-relaxed text-white/65">
        Real projects from my GitHub — from full-stack builds down to side projects. Every repo is
        live code, not tutorial clones.
      </p>
    </div>
  );
}

export async function ProjectsSection() {
  const repos = await fetchGitHubRepos("desousanathan");

  return (
    <section id="projects" className="mx-auto max-w-5xl px-[8vw] py-[90px]">
      <ProjectHeading />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {repos.length > 0 ? (
          repos.map((repo, i) => (
            <ProjectCardClient
              key={repo.id}
              repo={repo}
              accent={getLanguageColor(repo.language)}
              index={i}
              accentClass={accentClass}
            />
          ))
        ) : (
          <p className="text-white/65">Loading projects...</p>
        )}
      </div>
    </section>
  );
}
