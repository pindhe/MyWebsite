import type { ProjectItemCategory } from "@/lib/config";

export interface ProjectArtInput {
  title: string;
  repo: string;
  category: ProjectItemCategory;
  language: string;
  tech: string[];
}

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (Math.imul(31, hash) + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function getInitials(title: string): string {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

function getPalette(repo: string, category: ProjectItemCategory) {
  const seed = hashString(repo);
  const baseHue: Record<ProjectItemCategory, number> = {
    web: 262,
    mobile: 198,
    ai: 278,
    ui: 312,
    desktop: 28,
    backend: 228,
  };

  const hue1 = (baseHue[category] + (seed % 28) - 12 + 360) % 360;
  const hue2 = (hue1 + 38) % 360;

  return {
    seed,
    bg1: `hsl(${hue1} 62% 38%)`,
    bg2: `hsl(${hue2} 58% 22%)`,
    glow: `hsl(${hue1} 90% 72%)`,
  };
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shortTitle(title: string, max = 32): string {
  return title.length > max ? `${title.slice(0, max - 1)}…` : title;
}

/** Clean branded cover — used only when a real product photo cannot load */
export function generateProjectArtSvg(input: ProjectArtInput): string {
  const { title, repo, category, language, tech } = input;
  const palette = getPalette(repo, category);
  const initials = getInitials(title);
  const id = `p-${hashString(repo)}`;
  const chips = tech.slice(0, 3);

  const chipMarkup = chips
    .map((chip, index) => {
      const x = 64 + index * 118;
      return `
    <rect x="${x}" y="368" width="${Math.min(chip.length * 8 + 28, 108)}" height="30" rx="15" fill="rgba(255,255,255,0.12)"/>
    <text x="${x + 16}" y="388" fill="rgba(255,255,255,0.88)" font-size="13" font-family="ui-sans-serif, system-ui">${escapeXml(chip)}</text>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" role="img" aria-label="${escapeXml(title)} cover">
  <defs>
    <linearGradient id="${id}-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${palette.bg1}"/>
      <stop offset="100%" stop-color="${palette.bg2}"/>
    </linearGradient>
    <radialGradient id="${id}-orb" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${palette.glow}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="${palette.glow}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="480" fill="url(#${id}-bg)"/>
  <circle cx="640" cy="90" r="180" fill="url(#${id}-orb)"/>
  <circle cx="80" cy="420" r="150" fill="rgba(255,255,255,0.05)"/>
  <rect x="64" y="64" width="88" height="88" rx="22" fill="rgba(255,255,255,0.14)"/>
  <text x="108" y="120" text-anchor="middle" fill="white" font-size="32" font-weight="700" font-family="ui-sans-serif, system-ui">${escapeXml(initials || "EP")}</text>
  <text x="64" y="200" fill="rgba(255,255,255,0.62)" font-size="13" letter-spacing="3.2" font-family="ui-sans-serif, system-ui">${escapeXml(category.toUpperCase())}</text>
  <text x="64" y="248" fill="white" font-size="36" font-weight="700" font-family="ui-sans-serif, system-ui">${escapeXml(shortTitle(title))}</text>
  <text x="64" y="286" fill="rgba(255,255,255,0.62)" font-size="16" font-family="ui-sans-serif, system-ui">${escapeXml(repo)} · ${escapeXml(language)}</text>
  ${chipMarkup}
</svg>`;
}

export function getProjectArtDataUri(input: ProjectArtInput): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(generateProjectArtSvg(input))}`;
}
