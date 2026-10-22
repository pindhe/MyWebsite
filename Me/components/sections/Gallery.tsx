"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Images,
  MapPin,
  Sparkles,
  X,
  ZoomIn,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  gallery,
  galleryFilters,
  type GalleryCategory,
  type GalleryItem,
} from "@/lib/config";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const categoryLabel: Record<Exclude<GalleryCategory, "all">, string> = {
  events: "Event",
  meetings: "Meeting",
  stage: "Stage",
  portraits: "Portrait",
};

function Showcase({
  item,
  index,
  total,
  onPrev,
  onNext,
  onOpen,
  reduceMotion,
}: {
  item: GalleryItem;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onOpen: () => void;
  reduceMotion: boolean;
}) {
  return (
    <div className="gallery-showcase">
      {/* Side arrows (desktop) */}
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous photo"
        className="gallery-showcase-side-arrow left-0 hidden -translate-x-1/2 xl:flex"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next photo"
        className="gallery-showcase-side-arrow right-0 hidden translate-x-1/2 xl:flex"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="grid gap-0 lg:grid-cols-12">
        {/* Image */}
        <div className="lg:col-span-7">
          <button
            type="button"
            onClick={onOpen}
            className="gallery-showcase-media group"
            aria-label={`Open ${item.title}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                className="absolute inset-0"
                initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.5, ease: easeOut }}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width:1024px) 100vw, 58vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>
            <span className="gallery-showcase-zoom">
              <ZoomIn className="h-4 w-4" />
              View photo
            </span>
          </button>

          {/* Mobile nav row under image */}
          <div className="flex items-center justify-between gap-3 px-1 py-4 lg:hidden">
            <button type="button" onClick={onPrev} className="gallery-nav-btn">
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <span className="text-xs font-medium text-slate-500">
              {index + 1} of {total} images
            </span>
            <button type="button" onClick={onNext} className="gallery-nav-btn gallery-nav-btn-primary">
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col p-6 sm:p-8 lg:col-span-5 lg:border-l lg:border-[var(--glass-border)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={reduceMotion ? false : { opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="flex h-full flex-col"
            >
              <div className="flex flex-wrap items-center gap-2">
                {item.featured && (
                  <span className="gallery-badge gallery-badge-featured">
                    <Sparkles className="h-3.5 w-3.5" />
                    Featured
                  </span>
                )}
                <span className="gallery-badge">
                  <Calendar className="h-3.5 w-3.5" />
                  {categoryLabel[item.category]}
                </span>
                <span className="ml-auto text-sm font-medium text-slate-500">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-5 font-heading text-2xl font-bold leading-tight sm:text-[1.75rem]">
                {item.title}
              </h3>

              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-purple-light" />
                  {item.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-purple-light" />
                  {item.place}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
                {item.caption}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="gallery-tag">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto hidden items-center justify-between gap-3 pt-8 lg:flex">
                <button type="button" onClick={onPrev} className="gallery-nav-btn">
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
                <span className="text-xs font-medium text-slate-500">
                  {index + 1} of {total} images
                </span>
                <button type="button" onClick={onNext} className="gallery-nav-btn gallery-nav-btn-primary">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function Gallery() {
  const reduceMotion = Boolean(useReducedMotion());
  const [filter, setFilter] = useState<GalleryCategory>("all");
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const counts = useMemo(() => {
    const next: Partial<Record<GalleryCategory, number>> = { all: gallery.length };
    for (const item of gallery) {
      next[item.category] = (next[item.category] ?? 0) + 1;
    }
    return next;
  }, []);

  const items = useMemo(
    () => (filter === "all" ? gallery : gallery.filter((item) => item.category === filter)),
    [filter]
  );

  const total = items.length;
  const safeIndex = total === 0 ? 0 : Math.min(index, total - 1);
  const current = total === 0 ? null : items[safeIndex];

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => {
        const next = total === 0 ? 0 : (i + dir + total) % total;
        return next;
      });
    },
    [total]
  );

  const selectFilter = (option: GalleryCategory) => {
    setFilter(option);
    setIndex(0);
  };

  useEffect(() => {
    if (!lightbox) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(false);
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, go]);

  return (
    <section id="gallery" className="section-padding bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Gallery"
          title="Moments & Milestones"
          subtitle="A professional photo journal of the work — hackathons, stage talks, official meetings, and portraits from Hargeisa."
        />

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl glass px-4 py-2">
              <Images className="h-4 w-4 text-purple-light" />
              <span className="text-sm">
                <span className="font-bold gradient-text">{gallery.length}</span>
                <span className="text-slate-400"> moments</span>
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-xl glass px-4 py-2 text-sm text-slate-400">
              Events, meetings, stage & portraits
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {galleryFilters.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => selectFilter(option.id)}
                className={cn(
                  "filter-chip",
                  filter === option.id
                    ? "bg-purple text-white shadow-glow"
                    : "glass text-slate-400 hover:text-white"
                )}
              >
                {option.label}
                <span className="ml-1.5 opacity-60">({counts[option.id] ?? 0})</span>
              </button>
            ))}
          </div>
        </div>

        {current ? (
          <Showcase
            item={current}
            index={safeIndex}
            total={total}
            onPrev={() => go(-1)}
            onNext={() => go(1)}
            onOpen={() => setLightbox(true)}
            reduceMotion={reduceMotion}
          />
        ) : (
          <div className="glass-card p-10 text-center text-slate-400">
            No photos in this category yet.
          </div>
        )}

        <AnimatePresence>
          {lightbox && current && (
            <motion.div
              className="gallery-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(false)}
            >
              <button
                type="button"
                className="gallery-lightbox-close"
                aria-label="Close gallery"
                onClick={() => setLightbox(false)}
              >
                <X className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-prev"
                aria-label="Previous photo"
                onClick={(event) => {
                  event.stopPropagation();
                  go(-1);
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-next"
                aria-label="Next photo"
                onClick={(event) => {
                  event.stopPropagation();
                  go(1);
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <motion.figure
                key={current.id}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.28, ease: easeOut }}
                className="gallery-lightbox-frame"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={current.src}
                    alt={current.title}
                    fill
                    priority
                    sizes="90vw"
                    className="object-contain"
                  />
                </div>
                <figcaption className="gallery-lightbox-caption">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                    {safeIndex + 1} / {total} · {categoryLabel[current.category]} · {current.date}
                  </p>
                  <p className="mt-1 font-heading text-lg font-semibold">{current.title}</p>
                  <p className="mt-1 text-sm text-white/75">{current.caption}</p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-white/65">
                    <MapPin className="h-3.5 w-3.5" />
                    {current.place}
                  </p>
                </figcaption>
              </motion.figure>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
