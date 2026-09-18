"use client";

import { useState, useMemo, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useReducedMotion,
} from "framer-motion";
import {
  ExternalLink,
  Github,
  Search,
  FolderOpen,
  Check,
  Star,
  Globe,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectThumbnail } from "@/components/ui/ProjectThumbnail";
import {
  projects,
  projectFilters,
  githubReposUrl,
  type Project,
  type ProjectCategory,
} from "@/lib/config";
import { cn } from "@/lib/utils";

const FEATURED_REPOS = ["ilmaCader", "HRC-management", "Tanaad-College"];

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500/20 text-blue-300",
  JavaScript: "bg-yellow-500/20 text-yellow-300",
  Python: "bg-green-500/20 text-green-300",
  PHP: "bg-indigo-500/20 text-indigo-300",
  Dart: "bg-cyan-500/20 text-cyan-300",
};

const liveCount = projects.filter((p) => p.liveUrl).length;

const easeOut = [0.22, 1, 0.36, 1] as const;

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.98,
    transition: { duration: 0.2 },
  },
};

function ProjectCard({
  project,
  image,
  featured = false,
  reduceMotion,
}: {
  project: Project;
  image?: string;
  featured?: boolean;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.article
      variants={reduceMotion ? undefined : itemVariants}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      transition={{ type: "spring", stiffness: 340, damping: 26 }}
      className={cn("project-card group", featured && "project-card-featured")}
    >
      <div className="project-media relative h-52 overflow-hidden sm:h-56">
        <ProjectThumbnail
          title={project.title}
          repo={project.repo}
          category={project.category}
          language={project.language}
          tech={project.tech}
          image={image ?? project.image}
          className="absolute inset-0 h-full"
        />
        <div className="project-media-shade" />

        <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
          {featured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-purple/40 bg-purple/80 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
              <Sparkles className="h-3 w-3" />
              Featured
            </span>
          )}
          <span className="rounded-full border border-white/10 bg-surface-deep/70 px-2.5 py-1 text-[10px] font-semibold capitalize backdrop-blur-sm">
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

        {project.liveUrl && (
          <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-semibold text-emerald-300 backdrop-blur-sm">
            <span className="project-live-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Live
          </span>
        )}

        <div className="project-media-cta">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
            {project.liveUrl ? "Open live demo" : "View repository"}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-base font-semibold leading-snug transition-colors duration-150 group-hover:text-purple-light">
            {project.title}
          </h3>
          <span className="shrink-0 text-[10px] text-slate-500">{project.updated}</span>
        </div>

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
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !h-9 flex-1 !px-3 text-xs"
            >
              <Globe className="h-4 w-4" /> Live demo
            </a>
          ) : (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !h-9 flex-1 !px-3 text-xs"
            >
              <Github className="h-4 w-4" /> View repo
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline !h-9 !w-9 !p-0"
            aria-label={`${project.title} on GitHub`}
            title="GitHub"
          >
            {project.liveUrl ? <Github className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const reduceMotion = useReducedMotion();
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
        const q = search.trim().toLowerCase();
        const matchSearch =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.repo.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q)) ||
          p.language.toLowerCase().includes(q);
        return matchCat && matchSearch;
      }),
    [filter, search]
  );

  const featuredSet = useMemo(() => new Set(FEATURED_REPOS), []);
  const motionOff = Boolean(reduceMotion);

  return (
    <section id="projects" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={motionOff ? false : { opacity: 0, y: 16 }}
          whileInView={motionOff ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          <SectionHeader
            tag="Projects"
            title="Featured Work"
            subtitle="Live products I designed and shipped — family platforms, college sites, AI tools, and event apps."
          />
        </motion.div>

        <motion.div
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          initial={motionOff ? false : { opacity: 0, y: 14 }}
          whileInView={motionOff ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.08, ease: easeOut }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl glass px-4 py-2">
              <FolderOpen className="h-4 w-4 text-purple-light" />
              <span className="text-sm">
                <span className="font-bold gradient-text">{projects.length}</span>
                <span className="text-slate-400"> featured</span>
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-xl glass px-4 py-2">
              <Globe className="h-4 w-4 text-purple-light" />
              <span className="text-sm">
                <span className="font-bold gradient-text">{liveCount}</span>
                <span className="text-slate-400"> live deploys</span>
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-xl glass px-4 py-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-slate-400">GitHub-backed</span>
            </div>
          </div>
          <a
            href={githubReposUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline !h-10 text-xs"
          >
            <Github className="h-4 w-4" /> All repositories
          </a>
        </motion.div>

        <motion.div
          className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
          initial={motionOff ? false : { opacity: 0, y: 12 }}
          whileInView={motionOff ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.12, ease: easeOut }}
        >
          <LayoutGroup>
            <div className="flex flex-wrap gap-2">
              {projectFilters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "filter-chip relative isolate",
                    filter === f.id ? "text-white" : "glass text-slate-400 hover:text-white"
                  )}
                >
                  {filter === f.id && !motionOff && (
                    <motion.span
                      layoutId="pindhe-project-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-purple shadow-glow"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {filter === f.id && motionOff && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-purple shadow-glow" />
                  )}
                  {f.label}
                  {f.id !== "all" && (
                    <span className="ml-1.5 opacity-60">({categoryCounts[f.id] ?? 0})</span>
                  )}
                </button>
              ))}
            </div>
          </LayoutGroup>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="theme-input glass h-11 w-full pl-10 pr-4 text-sm lg:w-72"
            />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.p
              key="empty"
              initial={motionOff ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={motionOff ? undefined : { opacity: 0, y: -8 }}
              className="py-16 text-center text-slate-400"
            >
              No projects match your search.
            </motion.p>
          ) : (
            <motion.div
              key={`${filter}-${search.trim()}`}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={motionOff ? undefined : listVariants}
              initial={motionOff ? false : "hidden"}
              animate={motionOff ? undefined : "show"}
              exit={motionOff ? undefined : { opacity: 0 }}
            >
              {filtered.map((project) => (
                <ProjectCard
                  key={project.repo}
                  project={project}
                  image={project.image ?? dynamicImages[project.repo]}
                  featured={featuredSet.has(project.repo)}
                  reduceMotion={reduceMotion}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={motionOff ? false : { opacity: 0, y: 20 }}
          whileInView={motionOff ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="mt-12 overflow-hidden rounded-2xl border border-purple/20 bg-gradient-to-r from-purple/20 via-purple/10 to-blue-600/10 p-8 text-center sm:p-10"
        >
          <h3 className="font-heading text-2xl font-bold">Have a product in mind?</h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-400">
            {filtered.length} featured projects · from family platforms to college sites and AI tools.
            Let&apos;s build the next one.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="#contact" className="btn-primary inline-flex">
              Start a project
            </a>
            <a
              href={githubReposUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex"
            >
              <Github className="h-4 w-4" /> See everything on GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
