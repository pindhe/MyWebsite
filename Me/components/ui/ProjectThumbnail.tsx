"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getProjectImage } from "@/lib/project-images";
import { generateProjectArtSvg, type ProjectArtInput } from "@/lib/project-art";

interface ProjectThumbnailProps extends ProjectArtInput {
  image?: string;
  className?: string;
}

export function ProjectThumbnail({
  title,
  repo,
  category,
  language,
  tech,
  image,
  className,
}: ProjectThumbnailProps) {
  const [useFallback, setUseFallback] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const src = getProjectImage({ repo, image });

  useEffect(() => {
    setUseFallback(false);
    setLoaded(false);
  }, [src]);

  if (useFallback) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-surface-deep [&>svg]:h-full [&>svg]:w-full",
          className
        )}
        dangerouslySetInnerHTML={{
          __html: generateProjectArtSvg({ title, repo, category, language, tech }),
        }}
        aria-hidden
      />
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-surface-deep", className)}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-purple/20 via-surface-deep to-blue-500/10" />
      )}
      <Image
        src={src}
        alt={`${title} preview`}
        fill
        loading="lazy"
        className={cn(
          "object-cover transition-all duration-300 group-hover:scale-105",
          loaded ? "opacity-100" : "opacity-0"
        )}
        sizes="(max-width:768px) 100vw, 33vw"
        onLoad={() => setLoaded(true)}
        onError={() => setUseFallback(true)}
      />
    </div>
  );
}
