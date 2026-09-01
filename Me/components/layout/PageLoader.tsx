"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WELCOME_KEY = "eng-pindhe-welcome";
const ANIM_MS = 8217;
const FADE_MS = 0.55;

export function PageLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem(WELCOME_KEY);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduce) {
      setShow(false);
      return;
    }

    sessionStorage.setItem(WELCOME_KEY, "1");
    document.documentElement.style.overflow = "hidden";

    const timer = window.setTimeout(() => setShow(false), ANIM_MS);
    return () => {
      window.clearTimeout(timer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!show) {
      document.documentElement.style.overflow = "";
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
          <img
            src="/welcome.svg"
            alt="Welcome"
            className="welcome-intro-mark"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
