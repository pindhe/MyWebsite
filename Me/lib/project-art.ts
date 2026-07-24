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
    ai: 158,
    ui: 312,
    desktop: 28,
    backend: 228,
  };

  const hue1 = (baseHue[category] + (seed % 36) - 18 + 360) % 360;
  const hue2 = (hue1 + 42 + (seed % 24)) % 360;
  const hue3 = (hue1 + 180) % 360;

  return {
    seed,
    bg1: `hsl(${hue1} 72% 42%)`,
    bg2: `hsl(${hue2} 68% 32%)`,
    accent: `hsl(${hue3} 85% 68%)`,
    glow: `hsl(${hue1} 90% 72%)`,
    soft: `hsla(${hue2} 70% 88% / 0.18)`,
  };
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shortTitle(title: string, max = 28): string {
  return title.length > max ? `${title.slice(0, max - 1)}…` : title;
}

/** Deterministic SVG cover art — unique per project, no external images */
export function generateProjectArtSvg(input: ProjectArtInput): string {
  const { title, repo, category, language, tech } = input;
  const palette = getPalette(repo, category);
  const initials = getInitials(title);
  const id = `p-${hashString(repo)}`;
  const chips = tech.slice(0, 3);
  const orbX = 560 + (palette.seed % 120);
  const orbY = 80 + (palette.seed % 90);
  const orbR = 90 + (palette.seed % 50);

  const categoryLabel = category.toUpperCase();

  const webMock =
    category === "web" || category === "ui"
      ? `
    <rect x="72" y="118" width="360" height="228" rx="18" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)"/>
    <rect x="72" y="118" width="360" height="34" rx="18" fill="rgba(255,255,255,0.12)"/>
    <circle cx="92" cy="135" r="5" fill="#ff6b6b"/>
    <circle cx="110" cy="135" r="5" fill="#ffd93d"/>
    <circle cx="128" cy="135" r="5" fill="#6bcb77"/>
    <rect x="150" y="126" width="180" height="18" rx="9" fill="rgba(255,255,255,0.08)"/>
    <rect x="92" y="170" width="120" height="14" rx="7" fill="rgba(255,255,255,0.16)"/>
    <rect x="92" y="196" width="220" height="10" rx="5" fill="rgba(255,255,255,0.08)"/>
    <rect x="92" y="216" width="180" height="10" rx="5" fill="rgba(255,255,255,0.08)"/>
    <rect x="92" y="248" width="140" height="72" rx="12" fill="${palette.soft}"/>
    <rect x="246" y="248" width="160" height="72" rx="12" fill="rgba(255,255,255,0.06)"/>`
      : "";

  const mobileMock =
    category === "mobile"
      ? `
    <rect x="560" y="96" width="148" height="268" rx="28" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
    <rect x="576" y="128" width="116" height="196" rx="12" fill="rgba(255,255,255,0.06)"/>
    <rect x="592" y="148" width="84" height="12" rx="6" fill="rgba(255,255,255,0.18)"/>
    <rect x="592" y="172" width="64" height="8" rx="4" fill="rgba(255,255,255,0.08)"/>
    <rect x="592" y="190" width="72" height="8" rx="4" fill="rgba(255,255,255,0.08)"/>
    <rect x="592" y="220" width="84" height="56" rx="10" fill="${palette.soft}"/>
    <circle cx="634" cy="112" r="4" fill="rgba(255,255,255,0.25)"/>`
      : "";

  const aiMock =
    category === "ai"
      ? `
    <circle cx="620" cy="170" r="18" fill="${palette.accent}" opacity="0.85"/>
    <circle cx="690" cy="120" r="12" fill="rgba(255,255,255,0.25)"/>
    <circle cx="710" cy="210" r="14" fill="rgba(255,255,255,0.18)"/>
    <circle cx="560" cy="240" r="10" fill="rgba(255,255,255,0.2)"/>
    <line x1="620" y1="170" x2="690" y2="120" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
    <line x1="620" y1="170" x2="710" y2="210" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
    <line x1="620" y1="170" x2="560" y2="240" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
    <rect x="560" y="280" width="180" height="56" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)"/>
    <text x="650" y="314" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="14" font-family="ui-monospace, monospace">AI</text>`
      : "";

  const backendMock =
    category === "backend"
      ? `
    <ellipse cx="650" cy="290" rx="72" ry="22" fill="rgba(255,255,255,0.08)"/>
    <rect x="578" y="220" width="144" height="70" rx="8" fill="rgba(255,255,255,0.1)"/>
    <ellipse cx="650" cy="220" rx="72" ry="22" fill="rgba(255,255,255,0.14)"/>
    <line x1="520" y1="180" x2="578" y2="240" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
    <line x1="520" y1="260" x2="578" y2="260" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
    <rect x="500" y="168" width="18" height="18" rx="4" fill="${palette.accent}" opacity="0.7"/>
    <rect x="500" y="248" width="18" height="18" rx="4" fill="${palette.accent}" opacity="0.5"/>`
      : "";

  const desktopMock =
    category === "desktop"
      ? `
    <rect x="540" y="108" width="220" height="170" rx="10" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.16)"/>
    <rect x="540" y="108" width="220" height="28" rx="10" fill="rgba(255,255,255,0.12)"/>
    <rect x="556" y="150" width="88" height="56" rx="8" fill="${palette.soft}"/>
    <rect x="656" y="150" width="88" height="24" rx="6" fill="rgba(255,255,255,0.1)"/>
    <rect x="656" y="182" width="88" height="24" rx="6" fill="rgba(255,255,255,0.06)"/>
    <rect x="610" y="292" width="80" height="10" rx="5" fill="rgba(255,255,255,0.12)"/>`
      : "";

  const chipMarkup = chips
    .map((chip, index) => {
      const x = 72 + index * 108;
      return `
    <rect x="${x}" y="372" width="${Math.min(chip.length * 8 + 28, 100)}" height="28" rx="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)"/>
    <text x="${x + 14}" y="391" fill="rgba(255,255,255,0.72)" font-size="13" font-family="ui-monospace, monospace">${escapeXml(chip)}</text>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" role="img" aria-label="${escapeXml(title)} cover">
  <defs>
    <linearGradient id="${id}-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${palette.bg1}"/>
      <stop offset="100%" stop-color="${palette.bg2}"/>
    </linearGradient>
    <radialGradient id="${id}-orb" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${palette.glow}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="${palette.glow}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="${id}-grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="800" height="480" fill="url(#${id}-bg)"/>
  <rect width="800" height="480" fill="url(#${id}-grid)"/>
  <circle cx="${orbX}" cy="${orbY}" r="${orbR}" fill="url(#${id}-orb)"/>
  <circle cx="120" cy="380" r="140" fill="rgba(255,255,255,0.04)"/>

  ${webMock}
  ${mobileMock}
  ${aiMock}
  ${backendMock}
  ${desktopMock}

  <rect x="72" y="72" width="96" height="96" rx="24" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.18)"/>
  <text x="120" y="132" text-anchor="middle" fill="white" font-size="34" font-weight="700" font-family="system-ui, sans-serif">${escapeXml(initials || "EP")}</text>

  <text x="72" y="58" fill="rgba(255,255,255,0.55)" font-size="13" letter-spacing="3" font-family="system-ui, sans-serif">${categoryLabel}</text>
  <text x="72" y="300" fill="white" font-size="28" font-weight="700" font-family="system-ui, sans-serif">${escapeXml(shortTitle(title))}</text>
  <text x="72" y="332" fill="rgba(255,255,255,0.55)" font-size="15" font-family="ui-monospace, monospace">${escapeXml(repo)} · ${escapeXml(language)}</text>

  ${chipMarkup}

  <rect x="0" y="420" width="800" height="60" fill="rgba(0,0,0,0.18)"/>
</svg>`;
}

export function getProjectArtDataUri(input: ProjectArtInput): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(generateProjectArtSvg(input))}`;
}
