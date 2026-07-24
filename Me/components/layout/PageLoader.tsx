"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/config";

const LOADER_KEY = "eng-pindhe-loaded";

export function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem(LOADER_KEY);
    if (seen) {
      setLoading(false);
      return;
    }
    sessionStorage.setItem(LOADER_KEY, "1");
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg-base)]"
        >
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple/30 border-t-purple" />
          <p className="mt-4 font-heading text-base gradient-text">{siteConfig.shortName}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
