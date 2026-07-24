import type { Project } from "@/lib/config";

export const githubUsername = "pindhe";

/** Real GitHub Open Graph preview image per repository */
export function getGitHubRepoImage(repo: string): string {
  return `https://opengraph.githubassets.com/1/${githubUsername}/${encodeURIComponent(repo)}`;
}

export function getProjectImage(project: Pick<Project, "repo" | "image">): string {
  if (project.image?.startsWith("/") || project.image?.startsWith("data:")) {
    return project.image;
  }
  if (project.image?.startsWith("http://") || project.image?.startsWith("https://")) {
    return project.image;
  }
  return getGitHubRepoImage(project.repo);
}
