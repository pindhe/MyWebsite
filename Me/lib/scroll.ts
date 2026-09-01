let lastAnchorClick = 0;

/** Smooth scroll to anchor with fixed navbar offset */
export function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth") {
  if (!hash || hash === "#") return;
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;

  const navOffset = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - navOffset;

  const now = performance.now();
  const rapidClick = now - lastAnchorClick < 450;
  lastAnchorClick = now;

  window.scrollTo({ top, behavior: rapidClick ? "auto" : behavior });
}

export function initSmoothAnchors() {
  const onClick = (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!target?.hash || target.hash === "#") return;
    const el = document.getElementById(target.hash.slice(1));
    if (!el) return;
    e.preventDefault();
    scrollToHash(target.hash);
    history.pushState(null, "", target.hash);
  };

  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}

/** Section whose heading has crossed the spy line (below the fixed navbar). */
export function getActiveSectionHash(hashes: string[]): string {
  if (hashes.length === 0) return "#home";

  const scrollY = window.scrollY;
  const viewport = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;
  const offset = Math.max(88, Math.round(viewport * 0.22));

  if (scrollY + viewport >= docHeight - 64) {
    return hashes[hashes.length - 1] ?? "#home";
  }

  let current = hashes[0] ?? "#home";
  for (const hash of hashes) {
    const el = document.getElementById(hash.slice(1));
    if (!el) continue;
    const top = el.getBoundingClientRect().top + scrollY;
    if (top - offset <= scrollY + 1) {
      current = hash;
    }
  }
  return current;
}
