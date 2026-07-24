"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";

export function CursorGlow() {
  const { theme, mounted } = useTheme();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isTouch) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (!visible || !mounted || theme === "light") return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/10 blur-[80px]"
      animate={{ left: pos.x, top: pos.y }}
      transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      aria-hidden
    />
  );
}
