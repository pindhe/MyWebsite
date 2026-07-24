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
        className="object-cover object-[55%_35%] sm:object-[60%_center] lg:object-[68%_center]"
      />
      <div className="hero-bg-layer hero-bg-photo-overlay" />
      <div className="hero-bg-layer hero-bg-vignette" />
      <div className="hero-bg-layer hero-bg-noise" />
    </div>
  );
}
