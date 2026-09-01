"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
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
  ArrowRight,
  Heart,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { HeroBackground } from "@/components/effects/HeroBackground";
import { CVLink } from "@/components/ui/CVLink";

const JOIN_KEY = "eng-pindhe-joins";

function formatJoinCount(n: number) {
  if (n < 1000) return `${n}+`;
  return `${Math.floor(n / 1000) * 1000}+`;
}

function JoinPindhe() {
  const [count, setCount] = useState(1);
  const [liked, setLiked] = useState(false);
  const [bursts, setBursts] = useState<{ id: number }[]>([]);

  useEffect(() => {
    try {
      const stored = Number(localStorage.getItem(JOIN_KEY));
      if (Number.isFinite(stored) && stored >= 1) setCount(stored);
      if (localStorage.getItem(`${JOIN_KEY}-liked`) === "1") setLiked(true);
    } catch {
      /* ignore */
    }
  }, []);

  const onLove = () => {
    setCount((n) => {
      const next = n + 1;
      try {
        localStorage.setItem(JOIN_KEY, String(next));
        localStorage.setItem(`${JOIN_KEY}-liked`, "1");
      } catch {
        /* ignore */
      }
      return next;
    });
    setLiked(true);
    const id = Date.now() + Math.random();
    setBursts((current) => [...current, { id }]);
    window.setTimeout(() => {
      setBursts((current) => current.filter((burst) => burst.id !== id));
    }, 900);
  };

  return (
    <div className="hero-join">
      <p className="hero-join-copy">
        <span className="gradient-text">{formatJoinCount(count)}</span> join Pindhe
      </p>
      <button
        type="button"
        className={cn("hero-love-btn", liked && "hero-love-btn-on")}
        aria-label="Love and join Pindhe"
        onClick={onLove}
      >
        <Heart className="h-5 w-5" fill={liked ? "currentColor" : "none"} />
        {bursts.map((burst) => (
          <span key={burst.id} className="hero-love-plus" aria-hidden>
            +1
          </span>
        ))}
      </button>
    </div>
  );
}

const socials = [
  { icon: Github, href: siteConfig.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.linkedin, label: "LinkedIn" },
  { icon: MessageCircle, href: siteConfig.whatsapp, label: "WhatsApp" },
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
];

const statIcons = [Briefcase, FolderKanban, Star, Clock];

function useTypewriter(words: string[], enabled: boolean) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState(enabled ? "" : (words[0] ?? ""));
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  useEffect(() => {
    if (!enabled) {
      setDisplayText(words[0] ?? "");
      return;
    }

    const role = words[roleIndex] ?? "";

    if (phase === "typing") {
      if (displayText.length < role.length) {
        const timer = setTimeout(
          () => setDisplayText(role.slice(0, displayText.length + 1)),
          70
        );
        return () => clearTimeout(timer);
      }
      const timer = setTimeout(() => setPhase("deleting"), 2200);
      return () => clearTimeout(timer);
    }

    if (displayText.length > 0) {
      const timer = setTimeout(
        () => setDisplayText(displayText.slice(0, -1)),
        32
      );
      return () => clearTimeout(timer);
    }

    setRoleIndex((i) => (i + 1) % words.length);
    setPhase("typing");
  }, [displayText, phase, roleIndex, words, enabled]);

  return displayText;
}

function AnimatedCounter({
  target,
  suffix = "",
  reduceMotion,
}: {
  target: number;
  suffix?: string;
  reduceMotion: boolean | null;
}) {
  const [count, setCount] = useState(reduceMotion ? target : 0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reduceMotion || !started) return;
    const duration = 1800;
    const steps = 48;
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
  }, [target, started, reduceMotion]);

  if (reduceMotion) {
    return (
      <span>
        {target}
        {suffix}
      </span>
    );
  }

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
  const reduceMotion = useReducedMotion();
  const displayText = useTypewriter(siteConfig.roles, !reduceMotion);

  return (
    <section
      id="home"
      className="hero-cinematic relative isolate flex min-h-screen flex-col justify-center overflow-hidden pt-24 pb-28 sm:pb-32"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-purple/30 bg-purple/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-light">
                <Sparkles className="h-3.5 w-3.5" />
                {siteConfig.hero.greeting}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs text-slate-400">
                <MapPin className="h-3.5 w-3.5 text-purple-light" />
                {siteConfig.location}
              </span>
              <span className="hero-available inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {siteConfig.hero.availability}
              </span>
            </div>

            <h1 className="font-display text-[2.85rem] font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Nour H.{" "}
              <span className="gradient-text">Pindhe</span>
            </h1>

            <p className="sr-only">{siteConfig.roles.join(", ")}</p>
            <div
              className="mt-4 flex min-h-[2.5rem] items-center font-heading text-xl font-semibold sm:text-2xl lg:text-[1.75rem]"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="gradient-text">{displayText}</span>
              <span className="hero-caret ml-1 inline-block h-6 w-[2px] bg-purple-bright sm:h-7" />
            </div>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {siteConfig.bio}
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 sm:justify-start sm:gap-5">
              <p className="text-sm font-medium tracking-wide text-purple-light">
                {siteConfig.hero.focus}
              </p>
              <JoinPindhe />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CVLink className="btn-primary !px-5 shadow-glow">
                <Download className="h-4 w-4" />
                Download CV
              </CVLink>
              <a href="#contact" className="btn-outline !px-5">
                <Handshake className="h-4 w-4" />
                Hire me
              </a>
              <a href="#projects" className="btn-outline !px-5">
                View work
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-5 flex items-center gap-2">
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

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto hidden w-full max-w-md justify-center lg:flex lg:max-w-none"
          >
            <div className="relative">
              <div className="absolute inset-0 scale-110 rounded-[2rem] bg-purple/20 blur-[60px]" />
              <div className="spin-slow absolute -inset-5 rounded-[2.5rem] border border-dashed border-purple/25" />

              <div className="hero-portrait-ring relative">
                <div className="glass-card relative aspect-[4/5] w-72 overflow-hidden rounded-[1.85rem] border-0 shadow-glow sm:w-80 lg:w-[22rem]">
                  <Image
                    src={siteConfig.profileImage}
                    alt={siteConfig.name}
                    fill
                    priority
                    quality={90}
                    sizes="(max-width:768px) 288px, 352px"
                    className="object-cover object-[center_22%] grayscale contrast-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-deep via-surface-deep/20 to-purple/5" />
                  <div className="hero-profile-text absolute inset-x-0 bottom-0 hidden p-5 lg:block">
                    <p className="font-heading text-lg font-bold text-white">
                      {siteConfig.hero.displayName}
                    </p>
                    <p className="text-sm text-slate-300">{siteConfig.roles[0]}</p>
                  </div>
                </div>
              </div>

              <div className="hero-float-sm absolute -bottom-3 -right-2 hidden items-center gap-2 rounded-full border border-white/10 bg-surface/90 px-4 py-2 text-sm shadow-glass backdrop-blur-xl lg:flex lg:-right-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                </span>
                <span className="font-medium text-slate-200">{siteConfig.hero.availability}</span>
              </div>

              <div className="hero-float-lg absolute -left-4 top-8 hidden rounded-2xl glass px-4 py-3 sm:block lg:-left-8">
                <p className="text-xs text-slate-400">Experience</p>
                <p className="font-heading text-lg font-bold gradient-text">
                  {siteConfig.stats[0].value}
                  {siteConfig.stats[0].suffix} Years
                </p>
              </div>

              <div className="hero-float-sm absolute -right-2 top-16 hidden rounded-2xl glass px-3 py-2 text-xs font-medium text-slate-200 sm:block lg:-right-6">
                {siteConfig.hero.stack[0]}
              </div>
              <div className="hero-float-lg absolute bottom-24 -left-2 hidden rounded-2xl glass px-3 py-2 text-xs font-medium text-slate-200 sm:block lg:-left-6">
                {siteConfig.hero.stack[3]}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.55 }}
          className="mt-14 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-4"
        >
          {siteConfig.stats.map((stat, i) => {
            const Icon = statIcons[i] ?? Briefcase;
            return (
              <div
                key={stat.label}
                className="group glass-card flex min-w-0 items-center gap-3 p-3.5 sm:gap-4 sm:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple/15 text-purple-light transition-colors group-hover:bg-purple/25">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-heading text-xl font-bold gradient-text sm:text-2xl">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      reduceMotion={reduceMotion}
                    />
                  </p>
                  <p className="text-[11px] leading-tight text-slate-400 sm:text-sm">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

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
