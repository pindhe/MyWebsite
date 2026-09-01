"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { applyTheme, getInitialTheme, switchThemeFromPoint, themeStorageKey, type Theme } from "@/lib/theme";

type ThemeOrigin = { x: number; y: number };

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: (origin?: ThemeOrigin) => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);
  const busy = useRef(false);

  useEffect(() => {
    const initial = getInitialTheme();
    applyTheme(initial);
    setThemeState(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const stored = localStorage.getItem(themeStorageKey);
      if (stored === "dark" || stored === "light") return;
      const next = media.matches ? "dark" : "light";
      applyTheme(next);
      setThemeState(next);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback((origin?: ThemeOrigin) => {
    if (busy.current) return;
    busy.current = true;

    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      void switchThemeFromPoint(next, origin).finally(() => {
        busy.current = false;
      });
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
