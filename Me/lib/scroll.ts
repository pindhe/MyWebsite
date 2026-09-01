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

/** Section currently under the navbar (the one the page is on). */
export function getActiveSectionHash(hashes: string[]): string {
  if (hashes.length === 0) return "#home";

  const viewport = window.innerHeight;
  const scrollY = window.scrollY;
  const docHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight
  );

  if (scrollY + viewport >= docHeight - 72) {
    return hashes[hashes.length - 1] ?? "#home";
  }

  const header = document.querySelector("header");
  const probe = Math.round((header?.getBoundingClientRect().bottom ?? 80) + 20);

  let current = hashes[0] ?? "#home";

  for (const hash of hashes) {
    const el = document.getElementById(hash.slice(1));
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top <= probe && rect.bottom > probe) {
      return hash;
    }
    if (rect.top <= probe) {
      current = hash;
    }
  }

  return current;
}
