export type Theme = "dark" | "light";

export const themeStorageKey = "eng-pindhe-theme";

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.remove("dark", "light");
  document.documentElement.classList.add(theme);
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem(themeStorageKey, theme);

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "dark" ? "#050816" : "#f6f4fb");
  }
  document.documentElement.dataset.theme = theme;
}

export function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(themeStorageKey) as Theme | null;
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

type ThemeOrigin = { x: number; y: number };

type ViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function maxRevealRadius(x: number, y: number) {
  return Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );
}

function fallbackRipple(next: Theme, origin: ThemeOrigin) {
  return new Promise<void>((resolve) => {
    const ripple = document.createElement("div");
    const radius = maxRevealRadius(origin.x, origin.y);
    ripple.className = `theme-ripple ${next === "dark" ? "theme-ripple-dark" : "theme-ripple-light"}`;
    ripple.style.left = `${origin.x}px`;
    ripple.style.top = `${origin.y}px`;
    ripple.style.setProperty("--ripple-scale", String(Math.ceil(radius / 12) + 2));
    document.body.appendChild(ripple);

    requestAnimationFrame(() => {
      ripple.classList.add("theme-ripple-expand");
    });

    window.setTimeout(() => applyTheme(next), next === "dark" ? 160 : 120);
    window.setTimeout(() => {
      ripple.remove();
      resolve();
    }, 780);
  });
}

export async function switchThemeFromPoint(next: Theme, origin?: ThemeOrigin) {
  if (typeof document === "undefined") {
    return;
  }

  if (!origin || prefersReducedMotion()) {
    applyTheme(next);
    return;
  }

  const doc = document as Document & {
    startViewTransition?: (update: () => void) => ViewTransition;
  };

  if (typeof doc.startViewTransition !== "function") {
    await fallbackRipple(next, origin);
    return;
  }

  const { x, y } = origin;
  const endRadius = maxRevealRadius(x, y);
  const toDark = next === "dark";
  const duration = toDark ? 820 : 560;

  document.documentElement.classList.add("theme-reveal");
  if (toDark) document.documentElement.classList.add("theme-reveal-dark");

  try {
    const transition = doc.startViewTransition(() => {
      applyTheme(next);
    });

    await transition.ready;

    const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing,
        pseudoElement: "::view-transition-new(root)",
      }
    );

    document.documentElement.animate(
      {
        opacity: toDark ? [0.12, 1] : [0.4, 1],
      },
      {
        duration,
        easing: "ease-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );

    await transition.finished;
  } catch {
    applyTheme(next);
  } finally {
    document.documentElement.classList.remove("theme-reveal", "theme-reveal-dark");
  }
}
