"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === "dark";

  if (!mounted) {
    return <div className="theme-toggle" aria-hidden />;
  }

  return (
    <button
      type="button"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Light mode" : "Dark mode"}
      className={cn("theme-toggle", isDark && "theme-toggle-dark")}
    >
      <Sun
        className={cn(
          "pointer-events-none absolute left-2.5 h-4 w-4 transition-opacity duration-200",
          isDark ? "opacity-35 text-amber-300" : "opacity-0"
        )}
        aria-hidden
      />
      <Moon
        className={cn(
          "pointer-events-none absolute right-2.5 h-4 w-4 transition-opacity duration-200",
          isDark ? "opacity-0" : "opacity-40 text-slate-500"
        )}
        aria-hidden
      />
      <span
        className={cn(
          "theme-toggle-knob",
          isDark ? "theme-toggle-knob-dark" : "theme-toggle-knob-light"
        )}
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </span>
    </button>
  );
}
