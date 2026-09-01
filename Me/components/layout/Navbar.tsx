"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { LayoutGroup, motion } from "framer-motion";
import {
  Download,
  Handshake,
  Home,
  UserRound,
  CodeXml,
  FolderKanban,
  Sparkles,
  Briefcase,
  Send,
  type LucideIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { CVLink } from "@/components/ui/CVLink";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { navLinks, siteConfig } from "@/lib/config";
import { getActiveSectionHash } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Home,
  UserRound,
  CodeXml,
  FolderKanban,
  Sparkles,
  Briefcase,
  Send,
};

const highlightSpring = { type: "spring" as const, stiffness: 420, damping: 32, mass: 0.7 };
const hashes = navLinks.map((link) => link.href);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [hovered, setHovered] = useState<string | null>(null);
  const lockUntil = useRef(0);
  const showBottomNav = scrolled;

  const syncFromScroll = useCallback(() => {
    setScrolled(window.scrollY > 24);
    if (performance.now() < lockUntil.current) return;
    const next = getActiveSectionHash(hashes);
    setActive((current) => (current === next ? current : next));
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        syncFromScroll();
        ticking = false;
      });
    };
    syncFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onScroll);
    window.addEventListener("scrollend", onScroll);
    const main = document.querySelector("main");
    const observer = main
      ? new MutationObserver(() => syncFromScroll())
      : null;
    observer?.observe(main as Element, { childList: true, subtree: true });
    const late = [400, 1200, 2500].map((ms) => window.setTimeout(syncFromScroll, ms));
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onScroll);
      window.removeEventListener("scrollend", onScroll);
      observer?.disconnect();
      late.forEach((id) => window.clearTimeout(id));
    };
  }, [syncFromScroll]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hashes.includes(hash)) {
      lockUntil.current = performance.now() + 900;
      setActive(hash);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.bottomNav = showBottomNav ? "1" : "0";
    return () => {
      delete document.documentElement.dataset.bottomNav;
    };
  }, [showBottomNav]);

  const onNavClick = (href: string) => {
    setActive(href);
    setHovered(null);
    lockUntil.current = performance.now() + 2000;

    const started = performance.now();
    const release = () => {
      const el = document.getElementById(href.slice(1));
      if (!el || performance.now() - started > 2000) {
        lockUntil.current = 0;
        syncFromScroll();
        return;
      }
      const header = document.querySelector("header");
      const probe = (header?.getBoundingClientRect().bottom ?? 80) + 20;
      const rect = el.getBoundingClientRect();
      if (rect.top <= probe + 8 && rect.bottom > probe) {
        lockUntil.current = 0;
        return;
      }
      requestAnimationFrame(release);
    };
    requestAnimationFrame(release);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 overflow-visible transition-[padding,background,border] duration-150",
          scrolled ? "theme-nav-scrolled glass py-3 backdrop-blur-xl" : "bg-transparent py-5"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            className="relative z-10 flex items-center gap-2.5"
            aria-label="Eng Pindhe"
            onClick={() => onNavClick("#home")}
          >
            <BrandLogo size={38} priority />
            <span className="font-heading text-sm font-bold tracking-tight sm:text-base">
              Eng <span className="gradient-text">Pindhe</span>
            </span>
          </a>

          <LayoutGroup id="nav-rail">
            <div className="nav-rail" onMouseLeave={() => setHovered(null)}>
              {navLinks.map((link) => {
                const Icon = iconMap[link.icon];
                const isActive = active === link.href;
                const isHovered = hovered === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-label={link.label}
                    aria-current={isActive ? "page" : undefined}
                    title={link.label}
                    className={cn(
                      "nav-icon-btn",
                      isActive && "nav-icon-btn-active",
                      isHovered && !isActive && "nav-icon-btn-hover"
                    )}
                    onMouseEnter={() => setHovered(link.href)}
                    onFocus={() => setHovered(link.href)}
                    onBlur={() => setHovered(null)}
                    onClick={() => onNavClick(link.href)}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-highlight"
                        className="nav-icon-highlight"
                        transition={highlightSpring}
                      />
                    )}
                    {Icon && (
                      <Icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2.35 : 1.8} />
                    )}
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.16 }}
                        className="nav-icon-name"
                      >
                        {link.label}
                      </motion.span>
                    )}
                  </a>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <CVLink className="nav-action-btn btn-outline" aria-label="Download CV" title="Download CV">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">CV</span>
            </CVLink>
            <a
              href="#contact"
              aria-label="Hire me"
              title="Hire me"
              className="nav-action-btn btn-primary"
              onClick={() => onNavClick("#contact")}
            >
              <Handshake className="h-4 w-4" />
              <span className="hidden sm:inline">Hire</span>
            </a>
          </div>
        </nav>
      </header>

      <nav className={cn("nav-bottom", showBottomNav && "nav-bottom-show")} aria-label="Page sections">
        <LayoutGroup id="nav-bottom">
          {navLinks.map((link) => {
            const Icon = iconMap[link.icon];
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-label={link.label}
                aria-current={isActive ? "page" : undefined}
                className={cn("nav-bottom-btn", isActive && "nav-bottom-btn-active")}
                onClick={() => onNavClick(link.href)}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-bottom-highlight"
                    className="nav-bottom-highlight"
                    transition={highlightSpring}
                  />
                )}
                {Icon && <Icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2.4 : 1.85} />}
                <span>{link.label}</span>
              </a>
            );
          })}
        </LayoutGroup>
      </nav>
    </>
  );
}
