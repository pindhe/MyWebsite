"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig, education } from "@/lib/config";
import { Target, Eye, Rocket, CheckCircle2, MapPin, Code2 } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Mission",
    text: "Deliver innovative, user-focused digital solutions that empower businesses and individuals through modern technology.",
  },
  {
    icon: Eye,
    title: "Vision",
    text: "Pioneer accessible AI and software innovation across Somaliland and beyond.",
  },
  {
    icon: Rocket,
    title: "Core Values",
    text: "Excellence, integrity, continuous learning, and impact-driven engineering.",
  },
];

const highlights = [
  "Full Stack Web & Mobile Development",
  "UI/UX Design & Prototyping",
  "AI Integration & Automation",
  "Cloud Deployment (Vercel, AWS)",
  "Healthcare & Education Systems",
  "Startup & MVP Development",
];

export function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-purple/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="About Me"
          title="Turning Ideas Into Digital Reality"
          subtitle="Engineering smart, scalable solutions at the intersection of software, design, and AI."
        />

        <div className="grid items-start gap-10 lg:grid-cols-12">
          {/* Profile block */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <GlassCard className="!p-0 overflow-hidden">
              <div className="bg-gradient-to-br from-purple/30 to-blue-600/10 p-8 text-center">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-purple to-purple-bright font-display text-4xl font-bold text-white shadow-glow">
                  EP
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold">
                  Eng <span className="gradient-text">pindhe</span>
                </h3>
                <p className="mt-1 text-sm text-purple-light">{siteConfig.title}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-purple-light" />
                  {siteConfig.location}
                </div>
              </div>
              <div className="grid grid-cols-3 divide-x divide-white/5 border-t border-white/5">
                {siteConfig.stats.slice(0, 3).map((s) => (
                  <div key={s.label} className="p-4 text-center">
                    <p className="font-heading text-lg font-bold gradient-text">
                      {s.value}{s.suffix}
                    </p>
                    <p className="mt-0.5 text-[10px] text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <GlassCard>
              <div className="mb-4 flex items-center gap-2">
                <Code2 className="h-5 w-5 text-purple-light" />
                <h3 className="font-heading text-lg font-semibold">My Story</h3>
              </div>
              <p className="leading-relaxed text-slate-400">{siteConfig.bio}</p>
              <p className="mt-4 leading-relaxed text-slate-400">
                With 4+ years of hands-on experience, I&apos;ve delivered 30+ projects spanning hospital systems,
                education platforms, AI tools, and premium web applications — always focused on clean code,
                beautiful design, and real-world impact.
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-purple-light" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        </div>

        {/* Mission / Vision / Values */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {pillars.map((item, i) => (
            <GlassCard key={item.title} delay={i * 0.1} className="group">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple/15 text-purple-light transition-colors group-hover:bg-purple group-hover:text-white">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.text}</p>
            </GlassCard>
          ))}
        </div>

        {/* Education preview */}
        <div className="mt-10">
          <h3 className="mb-6 text-center font-heading text-xl font-semibold">Education Snapshot</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {education.slice(0, 3).map((edu, i) => (
              <GlassCard key={edu.id} delay={i * 0.08} className="relative !pb-5">
                <span className="text-xs font-semibold text-purple-light">{edu.period}</span>
                <h4 className="mt-2 font-heading font-semibold">{edu.degree}</h4>
                <p className="mt-1 text-sm text-slate-400">{edu.school}</p>
                <span className="absolute bottom-5 right-5 rounded-full bg-purple/10 px-2.5 py-0.5 text-[10px] font-medium text-purple-light">
                  {edu.status}
                </span>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
