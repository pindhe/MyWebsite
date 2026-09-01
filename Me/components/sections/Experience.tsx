"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  CheckCircle2,
  Github,
  Star,
  GitBranch,
  Users,
  MapPin,
  ExternalLink,
  Loader2,
  Calendar,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Education } from "@/components/sections/Education";
import { experience, githubProfile } from "@/lib/config";
import type { GitHubProfileData } from "@/lib/github";
import { cn } from "@/lib/utils";

const typeStyles = {
  work: "bg-purple/10 text-purple-light",
  internship: "bg-blue-500/10 text-blue-400",
  training: "bg-green-500/10 text-green-400",
};

const typeLabels = {
  work: "Work",
  internship: "Internship",
  training: "Training",
};

export function Experience() {
  const [github, setGithub] = useState<GitHubProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((data: GitHubProfileData) => setGithub(data))
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section id="experience" className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Experience"
            title="Work History"
            subtitle="Roles from hosting and full-stack delivery to design and college administration — Hargeisa, Somaliland."
          />

          {/* Live GitHub stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <GlassCard className="!p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple/15">
                    <Github className="h-6 w-6 text-purple-light" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold">Live GitHub Profile</p>
                    <a
                      href={github?.profileUrl ?? githubProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-light hover:underline"
                    >
                      @{github?.username ?? "pindhe"}
                    </a>
                  </div>
                </div>
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-purple-light" />
                ) : (
                  <span className="text-xs text-slate-500">
                    Member since {github?.memberSince ?? "—"}
                  </span>
                )}
              </div>

              {!loading && github && (
                <>
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { icon: GitBranch, label: "Repositories", value: github.repos },
                      { icon: Star, label: "Total Stars", value: `${github.stars}+` },
                      { icon: Users, label: "Followers", value: github.followers },
                      { icon: Briefcase, label: "Following", value: github.following },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="rounded-xl bg-white/5 p-3 text-center">
                        <Icon className="mx-auto h-4 w-4 text-purple-light" />
                        <p className="mt-1 font-heading text-lg font-bold gradient-text">{value}</p>
                        <p className="text-[10px] text-slate-500">{label}</p>
                      </div>
                    ))}
                  </div>

                  {github.topLanguages.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-slate-500">Top languages:</span>
                      {github.topLanguages.map((lang) => (
                        <span
                          key={lang.name}
                          className="rounded-full bg-purple/10 px-2.5 py-0.5 text-[10px] font-medium text-purple-light"
                        >
                          {lang.name} ({lang.count})
                        </span>
                      ))}
                    </div>
                  )}

                  {github.bio && (
                    <p className="mt-4 text-sm italic text-slate-400">&ldquo;{github.bio}&rdquo;</p>
                  )}
                </>
              )}
            </GlassCard>
          </motion.div>

          {/* Timeline */}
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-purple via-purple/50 to-transparent md:block" />

            <div className="space-y-8">
              {experience.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative md:pl-16"
                >
                  <div className="absolute left-4 top-6 hidden h-4 w-4 rounded-full border-2 border-purple bg-surface-deep md:block">
                    <div className="absolute inset-0.5 rounded-full bg-purple" />
                  </div>

                  <GlassCard className="group">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple/15 text-purple-light">
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase", typeStyles[job.type])}>
                              {typeLabels[job.type]}
                            </span>
                          </div>
                          <h3 className="font-heading text-lg font-semibold">{job.role}</h3>
                          <p className="text-sm font-medium text-purple-bright">{job.company}</p>
                          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                            <MapPin className="h-3 w-3" /> {job.location}
                          </p>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 rounded-full bg-purple/10 px-3 py-1 text-xs font-semibold text-purple-light">
                        <Calendar className="h-3 w-3" />
                        {job.period}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-slate-400">{job.description}</p>

                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {job.achievements.map((a) => (
                        <li key={a} className="flex items-center gap-2 text-sm text-slate-300">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-purple-light" />
                          {a}
                        </li>
                      ))}
                    </ul>

                    {job.link && (
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-purple-light hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View related work
                      </a>
                    )}
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent GitHub activity */}
          {!loading && github && github.recentRepos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto mt-10 max-w-4xl"
            >
              <h3 className="mb-4 text-center font-heading text-lg font-semibold">Recent GitHub Activity</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {github.recentRepos.map((repo) => (
                  <a
                    key={repo.name}
                    href={`https://github.com/pindhe/${repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card flex items-center justify-between rounded-xl p-4 transition-colors hover:border-purple/30"
                  >
                    <div>
                      <p className="font-mono text-sm font-medium text-purple-light">{repo.name}</p>
                      <p className="text-[10px] text-slate-500">Updated {repo.updated}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      {repo.language && <span>{repo.language}</span>}
                      {repo.stars > 0 && (
                        <span className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {repo.stars}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Education />
    </>
  );
}
