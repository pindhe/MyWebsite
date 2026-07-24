"use client";

import { useState } from "react";
import {
  Award,
  Code2,
  Globe,
  Users,
  Trophy,
  Download,
  Eye,
  ExternalLink,
  X,
  GraduationCap,
  BadgeCheck,
  Github,
  type LucideIcon,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { CVLink } from "@/components/ui/CVLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  certificates,
  certificateFilters,
  type CertificateCategory,
} from "@/lib/config";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, LucideIcon> = {
  engineering: Code2,
  programming: Code2,
  web: Globe,
  leadership: Users,
  awards: Trophy,
};

const categoryColors: Record<string, string> = {
  engineering: "from-purple to-purple-bright",
  programming: "from-blue-600 to-blue-400",
  web: "from-cyan-600 to-cyan-400",
  leadership: "from-amber-600 to-amber-400",
  awards: "from-yellow-500 to-orange-400",
};

type Cert = (typeof certificates)[number];

export function Certificates() {
  const [filter, setFilter] = useState<CertificateCategory>("all");
  const [preview, setPreview] = useState<Cert | null>(null);

  const filtered =
    filter === "all" ? certificates : certificates.filter((c) => c.category === filter);

  const verifiedCount = certificates.filter((c) => c.verified).length;

  return (
    <>
      <section id="certificates" className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Certificates"
            title="Credentials & Awards"
            subtitle="Verified academic credentials, GitHub achievements, and award-winning project recognition."
          />

          <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Total Credentials", value: certificates.length },
              { label: "Verified", value: `${verifiedCount}/${certificates.length}` },
              { label: "Institutions", value: "4" },
              { label: "GitHub Awards", value: "3" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-4 text-center">
                <p className="font-heading text-2xl font-bold gradient-text">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {certificateFilters
              .filter((f) => f.id === "all" || certificates.some((c) => c.category === f.id))
              .map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "filter-chip",
                    filter === f.id
                      ? "bg-purple text-white shadow-glow"
                      : "glass text-slate-400 hover:text-white"
                  )}
                >
                  {f.label}
                  {f.id !== "all" && (
                    <span className="ml-1.5 opacity-60">
                      ({certificates.filter((c) => c.category === f.id).length})
                    </span>
                  )}
                </button>
              ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((cert) => {
              const Icon = categoryIcons[cert.category] ?? Award;
              const gradient = categoryColors[cert.category] ?? "from-purple to-purple-bright";
              const isGithub = cert.org.includes("GitHub");

              return (
                <div key={cert.credentialId}>
                  <GlassCard className="group flex h-full flex-col !p-0 overflow-hidden">
                      <div className={cn("relative p-5 pb-4 bg-gradient-to-br", gradient)}>
                        <div className="absolute inset-0 bg-surface-deep/70" />
                        <div className="relative flex items-start justify-between">
                          <div
                            className={cn(
                              "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg",
                              gradient
                            )}
                          >
                            {isGithub ? <Github className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/80">
                              {cert.year}
                            </span>
                            {cert.verified && (
                              <span className="flex items-center gap-0.5 text-[10px] text-green-400">
                                <BadgeCheck className="h-3 w-3" /> Verified
                              </span>
                            )}
                          </div>
                        </div>
                        <h3 className="relative mt-4 font-heading text-sm font-semibold leading-snug">
                          {cert.title}
                        </h3>
                        <p className="relative mt-1 text-xs text-slate-300">{cert.org}</p>
                        {cert.grade && (
                          <span className="relative mt-2 inline-block rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium">
                            {cert.grade}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-5 pt-4">
                        <p className="flex-1 text-xs leading-relaxed text-slate-400 line-clamp-3">
                          {cert.description}
                        </p>
                        <p className="mt-3 font-mono text-[10px] text-purple-light/60">
                          {cert.credentialId}
                        </p>

                        <div className="mt-4 flex gap-2 border-t border-white/5 pt-4">
                          <button
                            type="button"
                            onClick={() => setPreview(cert)}
                            className="tap-fast flex flex-1 items-center justify-center gap-1.5 rounded-lg glass py-2 text-xs font-medium text-slate-300 hover:text-purple-light"
                          >
                            <Eye className="h-3.5 w-3.5" /> Preview
                          </button>
                          {cert.link ? (
                            <a
                              href={cert.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple/20 text-purple-light hover:bg-purple/30"
                              aria-label="View credential"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          ) : (
                            <CVLink
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple/20 text-purple-light hover:bg-purple/30"
                            >
                              <Download className="h-3.5 w-3.5" />
                            </CVLink>
                          )}
                        </div>
                      </div>
                    </GlassCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {preview && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={() => setPreview(null)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            onClick={(e) => e.stopPropagation()}
            className="mobile-menu-panel relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-glass"
          >
              <div
                className={cn(
                  "p-6 bg-gradient-to-br",
                  categoryColors[preview.category] ?? "from-purple to-purple-bright"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                    <GraduationCap className="h-7 w-7 text-white" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreview(null)}
                    className="rounded-lg bg-white/10 p-2 text-white/80 hover:bg-white/20"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold text-white">{preview.title}</h3>
                <p className="mt-1 text-sm text-white/80">{preview.org}</p>
                {preview.verified && (
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-green-300">
                    <BadgeCheck className="h-4 w-4" /> Verified credential
                  </span>
                )}
              </div>

              <div className="space-y-4 p-6">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-purple/10 px-3 py-1 text-xs font-medium capitalize text-purple-light">
                    {preview.category}
                  </span>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
                    {preview.year}
                  </span>
                  {preview.grade && (
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                      {preview.grade}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-slate-300">{preview.description}</p>
                <div className="rounded-xl glass p-4">
                  <p className="text-xs text-slate-500">Credential ID</p>
                  <p className="mt-1 font-mono text-sm text-purple-light">{preview.credentialId}</p>
                </div>
                <div className="flex gap-3">
                  {preview.link ? (
                    <a
                      href={preview.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex-1 !h-11 text-xs"
                    >
                      <ExternalLink className="h-4 w-4" /> View Proof
                    </a>
                  ) : (
                    <CVLink className="btn-primary flex-1 !h-11 text-xs">
                      <Download className="h-4 w-4" /> Download CV
                    </CVLink>
                  )}
                  <button
                    type="button"
                    onClick={() => setPreview(null)}
                    className="btn-outline flex-1 !h-11 text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
          </div>
        </div>
      )}
    </>
  );
}
