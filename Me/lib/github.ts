export type GitHubProfileData = {
  username: string;
  name: string;
  bio: string;
  avatar: string;
  repos: number;
  followers: number;
  following: number;
  stars: number;
  memberSince: string;
  profileUrl: string;
  topLanguages: { name: string; count: number }[];
  recentRepos: { name: string; updated: string; stars: number; language: string | null }[];
};
