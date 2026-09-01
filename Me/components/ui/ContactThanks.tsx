"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BrandLogo } from "@/components/ui/BrandLogo";

const SHOW_MS = 5500;

type ContactThanksProps = {
  open: boolean;
  onClose: () => void;
};

export function ContactThanks({ open, onClose }: ContactThanksProps) {
  const [mounted, setMounted] = useState(false);
  const [playKey, setPlayKey] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) setPlayKey((key) => key + 1);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const timer = window.setTimeout(onClose, SHOW_MS);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.documentElement.style.overflow = prevOverflow;
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-thanks-title"
          className="contact-thanks"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
        >
          <motion.div
            className="contact-thanks-panel"
            initial={{ opacity: 0, scale: 0.82, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
          >
            <BrandLogo size={56} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={playKey}
              src={`/cong.svg?play=${playKey}`}
              alt=""
              className="contact-thanks-anim"
            />
            <h2 id="contact-thanks-title" className="contact-thanks-title">
              Thanks — I&apos;ll answer you quickly
            </h2>
            <p className="contact-thanks-sub">Your message is on its way.</p>
            <p className="contact-thanks-hint">Tap anywhere to close</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
