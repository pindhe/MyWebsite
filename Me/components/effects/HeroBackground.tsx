"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/config";

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <Image
        src={siteConfig.heroImage}
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
        className="hero-photo-motion object-cover object-[38%_16%] sm:object-[40%_20%] lg:object-[46%_28%]"
      />

      <div className="hero-bg-layer hero-photo-grade" />
      <div className="hero-bg-layer hero-bg-photo-overlay-mobile lg:hidden" />
      <div className="hero-bg-layer hero-bg-photo-overlay hidden lg:block" />
      <div className="hero-bg-layer hero-bg-vignette" />
      <div
        className="hero-bg-layer opacity-40 lg:opacity-70"
        style={{
          backgroundImage: "url('/hero/hero-grid.svg')",
          backgroundSize: "cover",
        }}
      />
      <div className="hero-bg-layer hero-bg-noise" />
    </div>
  );
}
