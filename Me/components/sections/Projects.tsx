"use client";

import { useState, useMemo, useEffect } from "react";
import {
  ExternalLink,
  Github,
  Search,
  FolderOpen,
  Check,
  Star,
  GitBranch,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectThumbnail } from "@/components/ui/ProjectThumbnail";
import {
  projects,
  projectFilters,
  githubProfile,
  githubReposUrl,
  type ProjectCategory,
} from "@/lib/config";
import { cn } from "@/lib/utils";

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500/20 text-blue-300",
  JavaScript: "bg-yellow-500/20 text-yellow-300",
  Python: "bg-green-500/20 text-green-300",
  PHP: "bg-indigo-500/20 text-indigo-300",
  Java: "bg-orange-500/20 text-orange-300",
  Dart: "bg-cyan-500/20 text-cyan-300",
  HTML: "bg-red-500/20 text-red-300",
  "C#": "bg-purple-500/20 text-purple-300",
};

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const [search, setSearch] = useState("");
  const [dynamicImages, setDynamicImages] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/projects/images")
      .then((res) => res.json())
      .then((data: { images?: Record<string, string> }) => {
        if (data.images) setDynamicImages(data.images);
      })
      .catch(() => {});
  }, []);

  const totalStars = useMemo(
    () => projects.reduce((sum, p) => sum + p.stars, 0),
    []
  );

  const categoryCounts = useMemo(() => {
    const counts: Partial<Record<ProjectCategory, number>> = {};
    for (const p of projects) {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const matchCat = filter === "all" || p.category === filter;
        const matchSearch =
          !search ||
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.repo.toLowerCase().includes(search.toLowerCase()) ||
          p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
          p.language.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
      }),
    [filter, search]
  );

  return (
    <section id="projects" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Projects"
          title="Featured Work"
          subtitle="Real repositories from my GitHub — live README screenshots and project previews, updated automatically."
        />

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl glass px-4 py-2">
              <FolderOpen className="h-4 w-4 text-purple-light" />
              <span className="text-sm">
                <span className="font-bold gradient-text">{projects.length}</span>
                <span className="text-slate-400"> featured</span>
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-xl glass px-4 py-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">
                <span className="font-bold gradient-text">{totalStars}+</span>
                <span className="text-slate-400"> stars</span>
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-xl glass px-4 py-2">
              <GitBranch className="h-4 w-4 text-purple-light" />
              <span className="text-sm text-slate-400">27 repos on GitHub</span>
            </div>
          </div>
          <a
            href={githubReposUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline !h-10 text-xs"
          >
            <Github className="h-4 w-4" /> View All Repositories
          </a>
        </div>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {projectFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "filter-chip",
                  filter === f.id ? "bg-purple text-white shadow-glow" : "glass text-slate-400 hover:text-white"
                )}
              >
                {f.label}
                {f.id !== "all" && (
                  <span className="ml-1.5 opacity-60">
                    ({categoryCounts[f.id] ?? 0})
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              placeholder="Search by name, tech, language..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="theme-input glass h-11 w-full pl-10 pr-4 text-sm lg:w-72"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <article key={project.repo} className="project-card group">
              <div className="relative h-48 overflow-hidden">
                <ProjectThumbnail
                  title={project.title}
                  repo={project.repo}
                  category={project.category}
                  language={project.language}
                  tech={project.tech}
                  image={dynamicImages[project.repo] ?? project.image}
                  className="absolute inset-0 h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-deep via-surface-deep/50 to-transparent" />

                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-purple/80 px-2.5 py-1 text-[10px] font-semibold capitalize backdrop-blur-sm">
                    {project.category}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[10px] font-semibold backdrop-blur-sm",
                      languageColors[project.language] ?? "bg-white/10 text-slate-300"
                    )}
                  >
                    {project.language}
                  </span>
                </div>

                {project.stars > 0 && (
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {project.stars}
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading text-base font-semibold leading-snug transition-colors duration-150 group-hover:text-purple-light">
                    {project.title}
                  </h3>
                  <span className="shrink-0 text-[10px] text-slate-500">{project.updated}</span>
                </div>

                <p className="mt-1 font-mono text-[10px] text-purple-light/60">{project.repo}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400 line-clamp-2">
                  {project.description}
                </p>

                <ul className="mt-3 space-y-1">
                  {project.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Check className="h-3 w-3 shrink-0 text-purple-light" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex flex-wrap gap-1">
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-purple/10 px-2 py-0.5 text-[10px] font-medium text-purple-light"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex gap-2 border-t border-white/5 pt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !h-9 flex-1 !px-3 text-xs"
                  >
                    <Github className="h-4 w-4" /> View Repo
                  </a>
                  <a
                    href={githubProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline !h-9 !w-9 !p-0"
                    aria-label={`${project.title} on GitHub`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-slate-400">No projects match your search.</p>
        )}

        <p className="mt-12 text-center text-sm text-slate-400">
          Showing {filtered.length} of {projects.length} featured projects ·{" "}
          <a
            href={githubReposUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-purple-light hover:underline"
          >
            See all 27 repositories on GitHub →
          </a>
        </p>
      </div>
    </section>
  );
}
