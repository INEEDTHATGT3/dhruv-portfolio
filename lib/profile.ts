import snapshot from "@/content/github.json";
import resume from "@/content/resume.json";
import { site } from "@/content/site";
import { GITHUB_USER, REPOS_URL, trimRepo } from "@/lib/repos.mjs";

export type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
  fork: boolean;
  archived: boolean;
};

export const GITHUB_REVALIDATE = 21600; // 6 hours

// Live repo list; falls back to the snapshot `npm run sync` commits when the API is down or rate-limited.
async function getRepos(): Promise<Repo[]> {
  try {
    const token = process.env.GITHUB_TOKEN;
    const res = await fetch(REPOS_URL, {
      headers: { Accept: "application/vnd.github+json", ...(token && { Authorization: `Bearer ${token}` }) },
      next: { revalidate: GITHUB_REVALIDATE },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()).map(trimRepo);
  } catch (e) {
    console.warn(`GitHub feed: using committed snapshot (${(e as Error).message})`);
    return snapshot as Repo[];
  }
}

type Experience = (typeof resume.experience)[number];

export const roleLine = (e: Experience) =>
  `${/present/i.test(e.dates) ? "Currently" : "Most recently"} ${e.role} at ${e.org}`;

const dateParts = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

// "23 Sep 2026", or "Sep 2026" without the day.
export function formatDate(iso: string, day = true) {
  const p = Object.fromEntries(dateParts.formatToParts(new Date(iso)).map((x) => [x.type, x.value]));
  return `${day ? `${p.day} ` : ""}${p.month} ${p.year}`;
}

export const availability = resume.target ? `Available ${resume.target} · ${site.focus}` : site.focus;

export async function getProfile() {
  const repos = (await getRepos()).filter((r) => !r.fork && r.name !== GITHUB_USER);
  const pushed = new Map(repos.map((r) => [r.name, r.pushedAt]));
  const order = Object.keys(site.projects);
  const rank = (id: string) => (order.includes(id) ? order.indexOf(id) : order.length);

  const projects = resume.projects
    .filter((p) => !site.hidden.includes(p.id))
    .sort((a, b) => rank(a.id) - rank(b.id)) // stable: projects without copy keep résumé order
    .map((p) => ({ ...p, title: p.name.split(" — ")[0], ...site.projects[p.id], pushedAt: pushed.get(p.id) }));

  const onResume = new Set(resume.projects.map((p) => p.id));
  const active = repos
    .filter((r) => !r.archived && !site.hidden.includes(r.name))
    .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt));
  const dsa = resume.achievements.join(" ").match(/(\d[\d,]*\+?)\s+DSA problems/i)?.[1];
  // Each strength links to the work that backs it: a project card or the experience section.
  const proof = (key: string) => {
    const project = projects.find((x) => x.id === key);
    if (project) return { href: `#${project.id}`, label: project.title };
    const job = resume.experience.find((e) => e.org === key);
    return job ? { href: "#experience", label: job.org } : null;
  };
  const edu = resume.education[0];
  const classOf = edu?.dates.match(/(\d{2})\s*$/)?.[1];

  return {
    ...resume,
    links: resume.links as Record<string, string | undefined>, // résumé may add or drop profiles
    projects,
    strengths: site.strengths.map((s) => ({ ...s, proof: s.proof.map(proof).filter((x) => x !== null) })),
    // Repos not on the résumé yet (with code and a description): new work shows up without touching the site.
    moreRepos: active.filter((r) => r.description && r.language && !onResume.has(r.name)).slice(0, 6),
    lastPush: active[0],
    // "Civil Engineering, HBTU Kanpur ’28"
    studyLine:
      edu &&
      `${edu.degree.split(" — ")[0].split(" in ").pop()}, ${edu.school.match(/\(([^)]+)\)/)?.[1] ?? edu.school} ${
        edu.location.split(",")[0]
      }${classOf ? ` ’${classOf}` : ""}`,
    facts: [
      ["Internships", experience(resume.experience)],
      ["Projects", String(projects.length)],
      ["Public repos", String(repos.length)],
      ...(dsa ? [["DSA problems solved", dsa]] : []),
    ] as [string, string][],
  };
}

const experience = (list: Experience[]) => String(list.filter((e) => /intern/i.test(e.role)).length);
