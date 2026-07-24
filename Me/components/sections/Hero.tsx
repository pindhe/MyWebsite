"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Download,
  Mail,
  Github,
  Linkedin,
  MessageCircle,
  Handshake,
  MapPin,
  ChevronDown,
  Sparkles,
  Briefcase,
  FolderKanban,
  Star,
  Clock,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { HeroBackground } from "@/components/effects/HeroBackground";
import { CVLink } from "@/components/ui/CVLink";

const socials = [
  { icon: Github, href: siteConfig.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.linkedin, label: "LinkedIn" },
  { icon: MessageCircle, href: siteConfig.whatsapp, label: "WhatsApp" },
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
];

const statIcons = [Briefcase, FolderKanban, Star, Clock];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target, started]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => setStarted(true)}
    >
      {count}
      {suffix}
    </motion.span>
  );
}

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = siteConfig.roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setDeleting(true), 2200);
          }
        } else if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setDeleting(false);
          setRoleIndex((i) => (i + 1) % siteConfig.roles.length);
        }
      },
      deleting ? 35 : 75
    );
    return () => clearTimeout(timeout);
  }, [displayText, deleting, roleIndex]);

  return (
    <section id="home" className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden pt-24 pb-32">
      <HeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left — Content */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-purple/30 bg-purple/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-light">
                <Sparkles className="h-3.5 w-3.5" />
                Hello, I&apos;m
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs text-slate-400">
                <MapPin className="h-3.5 w-3.5 text-purple-light" />
                {siteConfig.location}
              </span>
            </div>

            <h1 className="font-heading text-[2.75rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Eng{" "}
              <span className="gradient-text">pindhe</span>
            </h1>

            <div className="mt-5 flex min-h-[2.75rem] items-center font-heading text-xl font-semibold sm:text-2xl lg:text-3xl">
              <span className="gradient-text">{displayText}</span>
              <span className="ml-0.5 inline-block h-7 w-0.5 animate-pulse bg-purple-bright sm:h-8" />
            </div>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {siteConfig.bio}
            </p>

            {/* Icon-only action buttons */}
            <div className="mt-8 flex items-center gap-3">
              <CVLink className="btn-primary !h-12 !w-12 !p-0 shadow-glow">
                <Download className="h-5 w-5" />
              </CVLink>
              <a
                href="#contact"
                aria-label="Hire Me"
                title="Hire Me"
                className="btn-outline !h-12 !w-12 !p-0"
              >
                <Handshake className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Contact"
                title="Contact"
                className="btn-outline !h-12 !w-12 !p-0"
              >
                <Mail className="h-5 w-5" />
              </a>

              <span className="mx-1 h-8 w-px bg-white/10" aria-hidden />

              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="nav-icon-btn glass !rounded-xl"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Profile visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto flex w-full max-w-md justify-center lg:max-w-none"
          >
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute inset-0 scale-110 rounded-[2rem] bg-purple/20 blur-[60px]" />

              {/* Rotating ring */}
              <div className="spin-slow absolute -inset-5 rounded-[2.5rem] border border-dashed border-purple/25" />

              {/* Main profile card */}
              <div className="glass-card relative aspect-[4/5] w-72 overflow-hidden rounded-[2rem] border border-white/15 shadow-glow sm:w-80 lg:w-[22rem]">
                <Image
                  src={siteConfig.profileImage}
                  alt={siteConfig.name}
                  fill
                  priority
                  quality={90}
                  sizes="(max-width:768px) 288px, 352px"
                  className="object-cover object-[center_22%] grayscale-[15%] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-deep via-surface-deep/25 to-purple/5" />
                <div className="hero-profile-text absolute inset-x-0 bottom-0 p-5">
                  <p className="font-heading text-lg font-bold text-white">Eng pindhe</p>
                  <p className="text-sm text-slate-300">Software Engineer</p>
                  <span className="mt-2 inline-flex rounded-full border border-purple/30 bg-purple/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-purple-light backdrop-blur-sm">
                    SOLTELCO Hackathon Speaker
                  </span>
                </div>
              </div>

              {/* Status badge */}
              <div className="hero-float-sm absolute -bottom-3 -right-2 flex items-center gap-2 rounded-full border border-white/10 bg-surface/90 px-4 py-2 text-sm shadow-glass backdrop-blur-xl sm:-right-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                </span>
                <span className="font-medium text-slate-200">Available for hire</span>
              </div>

              {/* Floating accent card */}
              <div className="hero-float-lg absolute -left-4 top-8 hidden rounded-2xl glass px-4 py-3 sm:block lg:-left-8">
                <p className="text-xs text-slate-400">Experience</p>
                <p className="font-heading text-lg font-bold gradient-text">4+ Years</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {siteConfig.stats.map((stat, i) => {
            const Icon = statIcons[i] ?? Briefcase;
            return (
              <div
                key={stat.label}
                className="group glass-card flex items-center gap-4 p-4 sm:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple/15 text-purple-light transition-colors group-hover:bg-purple/25">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-heading text-xl font-bold gradient-text sm:text-2xl">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs text-slate-400 sm:text-sm">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        className="scroll-hint tap-fast absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-slate-500 hover:text-purple-light"
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown className="h-4 w-4" />
      </a>
    </section>
  );
}
