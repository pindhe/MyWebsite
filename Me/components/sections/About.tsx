"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CVLink } from "@/components/ui/CVLink";
import { siteConfig } from "@/lib/config";
import {
  Target,
  Eye,
  Rocket,
  MapPin,
  Palette,
  Brain,
  Cloud,
  HeartPulse,
  Smartphone,
  Layers,
  Download,
  Handshake,
  ArrowRight,
} from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Mission",
    text: "Deliver user-focused digital products that help businesses and people work with modern, reliable software.",
  },
  {
    icon: Eye,
    title: "Vision",
    text: "Make strong engineering and AI more accessible across Somaliland — and ship work that travels beyond it.",
  },
  {
    icon: Rocket,
    title: "Values",
    text: "Clarity, integrity, continuous learning, and impact over noise. Build it clean. Ship it. Improve it.",
  },
];

const highlights = [
  { icon: Layers, label: "Full Stack Web & APIs" },
  { icon: Smartphone, label: "Mobile Apps (Flutter)" },
  { icon: Palette, label: "UI/UX & Design Systems" },
  { icon: Brain, label: "AI Integration" },
  { icon: Cloud, label: "Cloud & Deployment" },
  { icon: HeartPulse, label: "Healthcare & Education" },
];

export function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="section-padding section-alt relative overflow-hidden">
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-purple/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-blue-500/10 blur-[90px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="About Me"
          title={siteConfig.about.headline}
          subtitle={siteConfig.about.subtitle}
        />

        <div className="grid items-start gap-8 lg:grid-cols-12">
          <motion.aside
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <GlassCard className="overflow-hidden !p-0" animate={false}>
              <div className="relative hidden h-56 lg:block">
                <Image
                  src={siteConfig.profileImage}
                  alt={siteConfig.name}
                  fill
                  quality={90}
                  sizes="(min-width:1024px) 360px, 0px"
                  className="object-cover object-[center_18%] grayscale-[10%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-deep via-surface-deep/20 to-transparent" />
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-4 lg:block lg:text-center">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 lg:hidden">
                    <Image
                      src={siteConfig.profileImage}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover object-[center_20%]"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold">
                      Eng <span className="gradient-text">pindhe</span>
                    </h3>
                    <p className="mt-0.5 text-sm text-purple-light">{siteConfig.roles[0]}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 lg:justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs text-slate-400">
                    <MapPin className="h-3.5 w-3.5 text-purple-light" />
                    {siteConfig.location}
                  </span>
                  <span className="rounded-full border border-purple/30 bg-purple/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-purple-light">
                    {siteConfig.hero.speaker}
                  </span>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2 lg:justify-center" aria-label="Focus domains">
                  {siteConfig.about.domains.map((domain) => (
                    <li
                      key={domain}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300"
                    >
                      {domain}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-3 lg:justify-center">
                  <CVLink className="btn-primary !h-11 !px-4 text-sm">
                    <Download className="h-4 w-4" />
                    Download CV
                  </CVLink>
                  <a href="#contact" className="btn-outline !h-11 !px-4 text-sm">
                    <Handshake className="h-4 w-4" />
                    Hire me
                  </a>
                </div>
              </div>
            </GlassCard>
          </motion.aside>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <GlassCard>
              <p className="text-xs font-semibold uppercase tracking-widest text-purple-light">
                My story
              </p>
              {siteConfig.about.story.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="mt-4 leading-relaxed text-slate-400">
                  {paragraph}
                </p>
              ))}

              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5 text-sm text-slate-300"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple/15 text-purple-light">
                      <item.icon className="h-4 w-4" />
                    </span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pillars.map((item, i) => (
            <GlassCard key={item.title} delay={i * 0.08} className="group">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple/15 text-purple-light transition-colors group-hover:bg-purple group-hover:text-white">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.text}</p>
            </GlassCard>
          ))}
        </div>

        <div className="mt-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-purple-light">
                Path
              </p>
              <h3 className="mt-1 font-heading text-xl font-semibold">The journey so far</h3>
            </div>
            <a
              href="#education"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-light hover:text-white"
            >
              Academic background
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {siteConfig.about.journey.map((step, i) => (
              <GlassCard key={step.year} delay={i * 0.06} className="!p-4">
                <span className="font-heading text-sm font-bold text-purple-light">{step.year}</span>
                <h4 className="mt-2 font-heading text-sm font-semibold leading-snug">{step.title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{step.place}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
