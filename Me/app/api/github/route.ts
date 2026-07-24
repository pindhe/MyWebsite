import { NextResponse } from "next/server";
import type { GitHubProfileData } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  try {
    const headers = {
      Accept: "application/vnd.github+json",
      "User-Agent": "eng-pindhe-portfolio",
    };

    const [userRes, reposRes] = await Promise.all([
      fetch("https://api.github.com/users/pindhe", { headers, next: { revalidate: 3600 } }),
      fetch("https://api.github.com/users/pindhe/repos?per_page=100&sort=updated", {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok) throw new Error("GitHub user fetch failed");

    const user = await userRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];

    const stars = repos.reduce((sum: number, r: { stargazers_count?: number }) => sum + (r.stargazers_count ?? 0), 0);

    const langMap: Record<string, number> = {};
    repos.forEach((r: { language: string | null }) => {
      if (r.language) langMap[r.language] = (langMap[r.language] ?? 0) + 1;
    });
    const topLanguages = Object.entries(langMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const recentRepos = repos.slice(0, 5).map((r: {
      name: string;
      updated_at: string;
      stargazers_count: number;
      language: string | null;
    }) => ({
      name: r.name,
      updated: new Date(r.updated_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      stars: r.stargazers_count,
      language: r.language,
    }));

    const data: GitHubProfileData = {
      username: user.login,
      name: user.name ?? "Nour H pindhe",
      bio: user.bio ?? "",
      avatar: user.avatar_url,
      repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      stars,
      memberSince: new Date(user.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      profileUrl: user.html_url,
      topLanguages,
      recentRepos,
    };

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      {
        username: "pindhe",
        name: "Nour H pindhe",
        bio: "Full Stack Developer with a background in Biotechnology and Artificial Intelligence.",
        avatar: "",
        repos: 27,
        followers: 133,
        following: 11,
        stars: 400,
        memberSince: "September 2025",
        profileUrl: "https://github.com/pindhe",
        topLanguages: [
          { name: "HTML", count: 8 },
          { name: "PHP", count: 6 },
          { name: "Python", count: 4 },
        ],
        recentRepos: [],
      } satisfies GitHubProfileData,
      { status: 200 }
    );
  }
}
