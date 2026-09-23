# Sambhav Jaiswal — portfolio

**Live:** https://sambhavjaiswalportfolio.vercel.app

A one-page portfolio that keeps itself current: the LaTeX résumé is the single source of truth, GitHub fills in the rest, and nothing on the page is typed twice.

## How it stays up to date

| Source | Feeds | Refresh |
| --- | --- | --- |
| `RESUME_ROLES.tex` (all role tracks) | experience, projects, skills, education, leadership, links → `content/resume.json`; `SAMBHAV_CV_GEN.pdf` → `public/resume.pdf` | `npm run sync`, run weekly by a scheduled task |
| GitHub API | "Also on GitHub", last-push dates, repo count | live, re-fetched every 6 hours (ISR); falls back to `content/github.json` |
| `content/site.ts` | pitch, "What I bring", project summaries and key figures, display order | by hand |

- A new résumé project appears on its own with its résumé bullets; add a `summary` and `specs` in `content/site.ts` to polish it.
- A new public repo with code and a description appears under "Also on GitHub" within 6 hours, no deploy needed.
- `npm run sync` only rewrites files whose content changed, and refuses to write if the résumé parses into something broken (missing name, email or sections).

## Commands

```bash
npm install
npm run dev                         # http://localhost:3000
npm run sync -- "path/to/RESUME"    # résumé folder; defaults to $RESUME_DIR, then the Google Drive folder
npm test                            # résumé parser tests
npm run build
```

Optional: set `GITHUB_TOKEN` (a fine-grained token with no scopes is enough) in Vercel to avoid GitHub's 60-requests-per-hour limit for unauthenticated calls.

## Under the hood

- **Next.js 16 app router, one server-rendered page** with incremental static regeneration; only the 3D view and the copy button ship client JavaScript.
- **Hardware-aware 3D:** a procedural turbocharger compressor wheel (parametric blades, lathe hub) in React Three Fiber. Discrete GPUs and Apple silicon get PBR materials with a procedural studio environment; integrated GPUs get a hidden-line CAD drawing; phones skip three.js entirely. It spools up with scroll speed, pauses off-screen and stays still for `prefers-reduced-motion`.
- **Résumé parser** (`scripts/sync-resume.mjs`): a small brace-matching LaTeX reader that merges the GEN, AI, ML and SWE tracks, keeps the most detailed wording of each project and folds overlapping skill groups.
- Generated Open Graph image, sitemap, robots and JSON-LD `Person` data for search and link previews.
