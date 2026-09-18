"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToHash } from "@/lib/scroll";

const SEND_MS = 3100;

export function HireFlight() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [playKey, setPlayKey] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest("[data-hire-flight]");
      if (!target) return;

      event.preventDefault();
      event.stopPropagation();

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        scrollToHash("#contact", "auto");
        history.pushState(null, "", "#contact");
        return;
      }

      setPlayKey((key) => key + 1);
      setOpen(true);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const showContact = window.setTimeout(() => {
      scrollToHash("#contact", "auto");
      history.pushState(null, "", "#contact");
      window.requestAnimationFrame(() => setOpen(false));
    }, SEND_MS);

    return () => {
      document.documentElement.style.overflow = prevOverflow;
      window.clearTimeout(showContact);
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="hire-flight"
          role="status"
          aria-live="polite"
          aria-label="Sending you to contact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={playKey}
            src={`/send.svg?play=${playKey}`}
            alt=""
            className="hire-flight-svg"
          />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
