"use client";

import { useState, useEffect } from "react";
import { LayoutGroup, motion } from "framer-motion";
import {
  Menu,
  X,
  Download,
  Handshake,
  Home,
  User,
  Code2,
  FolderKanban,
  Layers,
  Briefcase,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { CVLink } from "@/components/ui/CVLink";
import { navLinks } from "@/lib/config";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Home,
  User,
  Code2,
  FolderKanban,
  Layers,
  Briefcase,
  Mail,
};

const highlightSpring = { type: "spring" as const, stiffness: 420, damping: 32, mass: 0.7 };

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [hovered, setHovered] = useState<string | null>(null);

  const focused = hovered ?? active;

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 overflow-visible transition-[padding,background,border] duration-150",
        scrolled ? "theme-nav-scrolled glass py-3 backdrop-blur-xl" : "bg-transparent py-5"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="font-heading text-lg font-bold tracking-tight">
          Eng <span className="gradient-text">pindhe</span>
        </a>

        <LayoutGroup id="nav-rail">
          <div
            className="nav-rail"
            onMouseLeave={() => setHovered(null)}
          >
            {navLinks.map((link) => {
              const Icon = iconMap[link.icon];
              const isActive = active === link.href;
              const isFocused = focused === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-label={link.label}
                  aria-current={isActive ? "page" : undefined}
                  className={cn("nav-icon-btn", isFocused && "nav-icon-btn-active")}
                  onMouseEnter={() => setHovered(link.href)}
                  onFocus={() => setHovered(link.href)}
                  onBlur={() => setHovered(null)}
                  onClick={() => setActive(link.href)}
                >
                  {isFocused && (
                    <motion.span
                      layoutId="nav-highlight"
                      className="nav-icon-highlight"
                      transition={highlightSpring}
                    />
                  )}
                  {Icon && (
                    <Icon className="h-[18px] w-[18px]" strokeWidth={isFocused ? 2.25 : 1.75} />
                  )}
                  {isFocused && (
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

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <CVLink className="nav-icon-btn btn-outline !h-10 !w-10 !p-0" aria-label="Download CV">
            <Download className="h-4 w-4" />
          </CVLink>
          <a
            href="#contact"
            aria-label="Hire me"
            className="nav-icon-btn btn-primary !h-10 !w-10 !p-0"
          >
            <Handshake className="h-4 w-4" />
          </a>
        </div>

        <button
          type="button"
          className="rounded-xl glass p-2 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu-panel">
          <div className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => {
              const Icon = iconMap[link.icon];
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setActive(link.href);
                    setMobileOpen(false);
                  }}
                  className={cn(
                    "tap-fast inline-flex items-center gap-3 rounded-lg px-4 py-3 text-[var(--text-secondary)] hover:bg-purple/10 hover:text-[var(--text-primary)]",
                    isActive && "bg-purple/10 text-[var(--text-primary)]"
                  )}
                >
                  {Icon && <Icon className="h-5 w-5 text-purple-light" />}
                  {link.label}
                </a>
              );
            })}
            <div className="mt-2 flex items-center gap-3">
              <ThemeToggle />
              <CVLink
                className="btn-outline !h-10 !w-10 !p-0"
                onClick={() => setMobileOpen(false)}
              >
                <Download className="h-4 w-4" />
              </CVLink>
              <a
                href="#contact"
                aria-label="Hire Me"
                className="btn-primary !h-10 !w-10 !p-0"
                onClick={() => setMobileOpen(false)}
              >
                <Handshake className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
