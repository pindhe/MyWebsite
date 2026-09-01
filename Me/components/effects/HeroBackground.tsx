"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/config";

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Mobile — designed background, no photos */}
      <div className="absolute inset-0 lg:hidden">
        <div className="hero-mobile-art absolute inset-0" />
        <div className="hero-bg-layer hero-mobile-mesh" />
        <div className="hero-mobile-orb hero-mobile-orb-a" />
        <div className="hero-mobile-orb hero-mobile-orb-b" />
        <div className="hero-bg-layer hero-bg-vignette" />
        <div className="hero-bg-layer hero-bg-noise" />
      </div>

      {/* Desktop — cinematic photo background */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src={siteConfig.heroImage}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[68%_center]"
        />
        <div className="hero-bg-layer hero-bg-photo-overlay" />
        <div className="hero-bg-layer hero-bg-vignette" />
        <div
          className="hero-bg-layer opacity-80"
          style={{
            backgroundImage: "url('/hero/hero-grid.svg')",
            backgroundSize: "cover",
          }}
        />
        <div className="hero-bg-layer hero-bg-noise" />
      </div>
    </div>
  );
}
