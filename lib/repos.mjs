// Shared by the site (lib/github.ts) and scripts/sync-resume.mjs, so the live GitHub feed
// and its committed fallback snapshot (content/github.json) always have the same shape.
export const GITHUB_USER = "INEEDTHATGT3";
export const REPOS_URL = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`;

export const trimRepo = (r) => ({
  name: r.name,
  description: r.description,
  url: r.html_url,
  homepage: r.homepage || null,
  language: r.language,
  stars: r.stargazers_count,
  pushedAt: r.pushed_at,
  fork: r.fork,
  archived: r.archived,
});
