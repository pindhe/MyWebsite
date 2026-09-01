"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  CheckCircle2,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { education } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Education() {
  const completed = education.filter((e) => e.status === "Completed").length;
  const inProgress = education.filter((e) => e.status === "In Progress").length;
  const institutions = new Set(education.map((e) => e.school)).size;

  return (
    <section id="education" className="section-padding bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Education"
          title="Academic Background"
          subtitle="Degrees, diplomas, and training from Abaarso Tech, Tanaad College, Iqra College, Somaliland Innovation Zone, Coursera, and Alison."
        />

        {/* Summary */}
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Programs", value: education.length },
            { label: "Completed", value: completed },
            { label: "In Progress", value: inProgress },
            { label: "Institutions", value: institutions },
          ].map((s) => (
            <div key={s.label} className="glass-card p-4 text-center">
              <p className="font-heading text-xl font-bold gradient-text">{s.value}</p>
              <p className="mt-1 text-xs text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-purple via-purple/40 to-transparent md:block" />

          <div className="space-y-6">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative md:pl-16"
              >
                <div className="absolute left-4 top-8 hidden h-4 w-4 rounded-full border-2 border-purple bg-surface-deep md:block">
                  <div
                    className={cn(
                      "absolute inset-0.5 rounded-full",
                      edu.status === "Completed" ? "bg-green-400" : "bg-amber-400 animate-pulse"
                    )}
                  />
                </div>

                <GlassCard className="group">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple/15 text-purple-light transition-colors group-hover:bg-purple group-hover:text-white">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase",
                              edu.status === "Completed"
                                ? "bg-green-500/10 text-green-400"
                                : "bg-amber-500/10 text-amber-400"
                            )}
                          >
                            {edu.status}
                          </span>
                          <span className="rounded-full bg-purple/10 px-2.5 py-0.5 text-[10px] text-purple-light">
                            {edu.field}
                          </span>
                        </div>
                        <h3 className="font-heading text-lg font-semibold">{edu.degree}</h3>
                        <p className="text-sm font-medium text-purple-bright">{edu.school}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                          <MapPin className="h-3 w-3" /> {edu.location}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                      {edu.period}
                    </span>
                  </div>

                  {edu.description && (
                    <p className="mt-4 text-sm leading-relaxed text-slate-400">{edu.description}</p>
                  )}

                  {edu.highlights.length > 0 && (
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {edu.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-slate-300">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-purple-light" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  {edu.projectLink && (
                    <a
                      href={edu.projectLink}
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

        {/* Institutions note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs text-slate-400">
            <BookOpen className="h-4 w-4 text-purple-light" />
            All credentials match the CV — download the resume or open linked GitHub work
          </div>
        </motion.div>
      </div>
    </section>
  );
}
