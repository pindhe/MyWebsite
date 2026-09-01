"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ANIM_MS = 8217;
const HOLD_MS = 650;
const FADE_MS = 0.7;

export function PageLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShow(false);
      return;
    }

    document.documentElement.style.overflow = "hidden";
    window.scrollTo({ top: 0 });

    let cancelled = false;
    let started = false;
    let timer: number | undefined;
    const img = document.querySelector<HTMLImageElement>(".welcome-intro-mark");

    const finish = () => {
      if (cancelled) return;
      setShow(false);
    };

    const start = () => {
      if (cancelled || started) return;
      started = true;
      timer = window.setTimeout(finish, ANIM_MS + HOLD_MS);
    };

    if (img?.complete && img.naturalWidth > 0) {
      start();
    } else {
      img?.addEventListener("load", start, { once: true });
      timer = window.setTimeout(start, 300);
    }

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
      img?.removeEventListener("load", start);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!show) {
      document.documentElement.style.overflow = "";
      window.scrollTo({ top: 0 });
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Welcome"
          aria-modal="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_MS, ease: [0.22, 1, 0.36, 1] }}
          className="welcome-intro"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/welcome.svg" alt="Welcome" className="welcome-intro-mark" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
