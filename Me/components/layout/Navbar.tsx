"use client";

import { useState, useEffect } from "react";
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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[padding,background,border] duration-150",
        scrolled ? "theme-nav-scrolled glass py-3 backdrop-blur-xl" : "bg-transparent py-5"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="font-heading text-lg font-bold tracking-tight">
          Eng <span className="gradient-text">pindhe</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.href}
                href={link.href}
                aria-label={link.label}
                title={link.label}
                className="nav-icon-btn group"
              >
                {Icon && (
                  <Icon className="h-[18px] w-[18px]" />
                )}
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <CVLink className="btn-outline !h-10 !w-10 !p-0">
            <Download className="h-4 w-4" />
          </CVLink>
          <a
            href="#contact"
            aria-label="Hire Me"
            title="Hire Me"
            className="btn-primary !h-10 !w-10 !p-0"
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
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="tap-fast inline-flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-purple/10 hover:text-white"
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
