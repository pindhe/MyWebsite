import { githubUsername, getGitHubRepoImage } from "@/lib/project-images";

const githubHeaders = {
  Accept: "application/vnd.github+json",
  "User-Agent": "eng-pindhe-portfolio",
};

function isBadgeOrIconUrl(url: string): boolean {
  return /shields\.io|badge|img\.shields|github\.com\/actions|workflow|dependabot|codecov|travis-ci|circleci|gitter|discord/i.test(
    url
  );
}

export function resolveReadmeImageUrl(rawUrl: string, owner: string, repo: string): string {
  const url = rawUrl.trim().replace(/^<|>$/g, "");
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) {
    return `https://raw.githubusercontent.com/${owner}/${repo}/HEAD${url}`;
  }
  return `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/${url.replace(/^\.\//, "")}`;
}

export function extractFirstReadmeImage(markdown: string, owner: string, repo: string): string | null {
  const candidates: string[] = [];

  for (const match of markdown.matchAll(/!\[[^\]]*]\(([^)\s]+(?:\s+"[^"]*")?)\)/g)) {
    candidates.push(match[1].split(/\s+/)[0]);
  }

  for (const match of markdown.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) {
    candidates.push(match[1]);
  }

  for (const raw of candidates) {
    const resolved = resolveReadmeImageUrl(raw, owner, repo);
    if (!isBadgeOrIconUrl(resolved)) return resolved;
  }

  return null;
}

export async function fetchReadmeImage(owner: string, repo: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
      headers: { ...githubHeaders, Accept: "application/vnd.github.raw" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const markdown = await res.text();
    return extractFirstReadmeImage(markdown, owner, repo);
  } catch {
    return null;
  }
}

async function fetchHomepageImage(homepage: string): Promise<string | null> {
  try {
    const res = await fetch(homepage, {
      headers: { "User-Agent": "eng-pindhe-portfolio" },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const html = await res.text();
    const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
      ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    return ogMatch?.[1] ?? null;
  } catch {
    return null;
  }
}

async function fetchRepoMeta(owner: string, repo: string): Promise<{ homepage: string | null }> {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: githubHeaders,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return { homepage: null };
    const data = (await res.json()) as { homepage?: string | null };
    return { homepage: data.homepage || null };
  } catch {
    return { homepage: null };
  }
}

/** Resolve the best real image URL for a GitHub repository */
export async function resolveProjectImageUrl(repo: string): Promise<string> {
  const owner = githubUsername;

  const [readmeImage, meta] = await Promise.all([
    fetchReadmeImage(owner, repo),
    fetchRepoMeta(owner, repo),
  ]);

  if (readmeImage) return readmeImage;

  if (meta.homepage) {
    const ogImage = await fetchHomepageImage(meta.homepage);
    if (ogImage) return ogImage;
  }

  return getGitHubRepoImage(repo);
}

export async function fetchAllProjectImages(repos: string[]): Promise<Record<string, string>> {
  const results = await Promise.all(
    repos.map(async (repo) => {
      const image = await resolveProjectImageUrl(repo);
      return [repo, image] as const;
    })
  );
  return Object.fromEntries(results);
}
