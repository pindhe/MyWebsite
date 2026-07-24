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
