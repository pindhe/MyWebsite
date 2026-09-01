"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const SLIDE_MS = 7500;

export function HeroBackground() {
  const slides = siteConfig.heroImages;
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [reduceMotion, slides.length, index]);

  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="hero-bg-frame">
          {slides.map((slide, i) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt=""
              fill
              priority={i === 0}
              quality={90}
              sizes="100vw"
              className={cn(
                "hero-bg-layer object-cover transition-opacity duration-1000 ease-out",
                slide.object,
                slide.motion,
                i === index ? "opacity-100" : "opacity-0"
              )}
            />
          ))}

          <div className="hero-bg-layer hero-photo-grade" />
          <div className="hero-bg-layer hero-bg-photo-overlay-mobile lg:hidden" />
          <div className="hero-bg-layer hero-bg-photo-overlay hidden lg:block" />
          <div className="hero-bg-layer hero-bg-vignette" />
          <div
            className="hero-bg-layer opacity-30 lg:opacity-70"
            style={{
              backgroundImage: "url('/hero/hero-grid.svg')",
              backgroundSize: "cover",
            }}
          />
          <div className="hero-bg-layer hero-bg-noise" />
        </div>
        <div className="hero-mobile-bg-tail lg:hidden" />
      </div>

      <div className="hero-slide-dots">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Background ${i + 1}: ${slide.label}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={cn("hero-slide-dot", i === index && "hero-slide-dot-active")}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}
