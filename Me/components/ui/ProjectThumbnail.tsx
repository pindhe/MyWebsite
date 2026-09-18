"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getGitHubRepoImage, getProjectImage } from "@/lib/project-images";
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
  const sources = useMemo(() => {
    const primary = getProjectImage({ repo, image });
    const github = getGitHubRepoImage(repo);
    return Array.from(new Set([primary, github].filter(Boolean)));
  }, [image, repo]);

  const [sourceIndex, setSourceIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const src = sources[sourceIndex];

  useEffect(() => {
    setSourceIndex(0);
    setLoaded(false);
  }, [sources]);

  if (!src) {
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
          "object-cover object-top transition-[transform,opacity] duration-700 ease-out group-hover:scale-110",
          loaded ? "opacity-100" : "opacity-0"
        )}
        sizes="(max-width:768px) 100vw, 33vw"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setLoaded(false);
          setSourceIndex((current) => current + 1);
        }}
      />
    </div>
  );
}
