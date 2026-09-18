"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
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

function GalleryCard({
  item,
  index,
  onOpen,
  reduceMotion,
}: {
  item: GalleryItem;
  index: number;
  onOpen: () => void;
  reduceMotion: boolean;
}) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.28), ease: easeOut }}
      className="gallery-card group"
    >
      <button
        type="button"
        onClick={onOpen}
        className="block w-full text-left"
        aria-label={`Open ${item.title}`}
      >
        <div className="gallery-card-media relative h-56 overflow-hidden sm:h-60">
          <Image
            src={item.src}
            alt={item.title}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="gallery-card-shade" />
          <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
            {item.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-purple/90 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                <Sparkles className="h-3 w-3" />
                Featured
              </span>
            )}
            <span className="rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              {categoryLabel[item.category]}
            </span>
          </div>
          <div className="gallery-card-cta">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
              <ZoomIn className="h-3.5 w-3.5" />
              View photo
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-purple-light" />
              {item.year}
            </span>
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-purple-light" />
              <span className="truncate">{item.place}</span>
            </span>
          </div>
          <h3 className="mt-3 font-heading text-lg font-semibold leading-snug transition-colors duration-150 group-hover:text-purple-light">
            {item.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">
            {item.caption}
          </p>
        </div>
      </button>
    </motion.article>
  );
}

export function Gallery() {
  const reduceMotion = Boolean(useReducedMotion());
  const [filter, setFilter] = useState<GalleryCategory>("all");
  const [active, setActive] = useState<number | null>(null);

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

  const current = active == null ? null : items[active];

  useEffect(() => {
    if (active == null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") {
        setActive((i) => (i == null ? 0 : (i + 1) % items.length));
      }
      if (event.key === "ArrowLeft") {
        setActive((i) => (i == null ? 0 : (i - 1 + items.length) % items.length));
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, items.length]);

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
          <LayoutGroup>
            <div className="flex flex-wrap gap-2">
              {galleryFilters.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setFilter(option.id);
                    setActive(null);
                  }}
                  className={cn(
                    "filter-chip relative isolate",
                    filter === option.id ? "text-white" : "glass text-slate-400 hover:text-white"
                  )}
                >
                  {filter === option.id && (
                    <motion.span
                      layoutId="pindhe-gallery-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-purple shadow-glow"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {option.label}
                  <span className="ml-1.5 opacity-60">({counts[option.id] ?? 0})</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
              reduceMotion={reduceMotion}
              onOpen={() => setActive(index)}
            />
          ))}
        </div>

        <AnimatePresence>
          {current && active != null && (
            <motion.div
              className="gallery-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            >
              <button
                type="button"
                className="gallery-lightbox-close"
                aria-label="Close gallery"
                onClick={() => setActive(null)}
              >
                <X className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-prev"
                aria-label="Previous photo"
                onClick={(event) => {
                  event.stopPropagation();
                  setActive((i) => (i == null ? 0 : (i - 1 + items.length) % items.length));
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
                  setActive((i) => (i == null ? 0 : (i + 1) % items.length));
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
                    {active + 1} / {items.length} · {categoryLabel[current.category]} · {current.year}
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
