"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Disable scroll-in animation for lighter pages */
  animate?: boolean;
}

export function GlassCard({ children, className, delay = 0, animate = true }: GlassCardProps) {
  const reduceMotion = useReducedMotion();

  if (!animate || reduceMotion) {
    return (
      <div className={cn("glass-card glass-card-lift p-6", className)}>{children}</div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn("glass-card glass-card-lift p-6", className)}
    >
      {children}
    </motion.div>
  );
}
