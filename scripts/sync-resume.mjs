// Keeps the portfolio in step with the résumé (the source of truth) and GitHub.
//
//   npm run sync -- [resumeDir]      (default: $RESUME_DIR, then the Google Drive folder below)
//
//   <resumeDir>/RESUME_ROLES.tex   -> content/resume.json   (every role track merged, GEN wording first)
//   <resumeDir>/SAMBHAV_CV_GEN.pdf -> public/resume.pdf
//   GitHub public repos            -> content/github.json   (fallback for when the live API is down)
//
// Files are rewritten only when their content changed, so a no-op run leaves git clean.
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { REPOS_URL, trimRepo } from "../lib/repos.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_DIR = "G:/My Drive/INTERNSHIP AND MORE APPLICATION BASED HELPER AGENT/RESUME";
const TEX = "RESUME_ROLES.tex";
const PDF = "SAMBHAV_CV_GEN.pdf";
const TRACKS = ["GEN", "AI", "ML", "SWE"]; // GEN first: its wording wins when tracks repeat an entry

// ---------- minimal LaTeX reading ----------

const stripComments = (s) => s.replace(/(^|[^\\])%.*$/gm, "$1");

// Reads `n` brace groups starting at src[i]; null when one is missing (e.g. inside \newcommand).
function readArgs(src, i, n) {
  const args = [];
  for (let k = 0; k < n; k++) {
    while (/\s/.test(src[i] ?? "")) i++;
    if (src[i] !== "{") return null;
    let depth = 0;
    let j = i;
    // Backslash skips the next character, so escaped \{ \} \% never count as braces.
    for (; j < src.length; j++) {
      if (src[j] === "\\") j++;
      else if (src[j] === "{") depth++;
      else if (src[j] === "}" && --depth === 0) break;
    }
    args.push(src.slice(i + 1, j));
    i = j + 1;
  }
  return { args, end: i };
}

// Every `\name{..}...{..}` call with n brace arguments.
function calls(src, name, n) {
  const re = new RegExp(`\\\\${name}(?![A-Za-z])`, "g");
  const out = [];
  for (let m; (m = re.exec(src));) {
    const r = readArgs(src, m.index + m[0].length, n);
    if (r) out.push({ start: m.index, ...r });
  }
  return out;
}

export function tex2text(s) {
  s = s.replace(/\\[vh]space\*?\{[^{}]*\}/g, "");
  // Unwrap one-argument macros (\textbf{x}, \emph{x}, \underline{x}, \href{url}{x}) innermost first.
  for (let prev; prev !== s; ) {
    prev = s;
    s = s.replace(/\\href\{[^{}]*\}\{([^{}]*)\}/g, "$1");
    s = s.replace(/\\(?!href)[A-Za-z]+\*?\{([^{}]*)\}/g, "$1");
  }
  return s
    .replace(/\\\\/g, " ")
    .replace(/(?<!\\)\$/g, "") // math delimiters: $|$ -> |
    .replace(/(?<!\\)[{}]/g, "")
    .replace(/\\ /g, " ")
    .replace(/\\([&%$#_{}])/g, "$1")
    .replace(/\\[A-Za-z]+\*?/g, "") // argument-less macros (\small, \quad)
    .replace(/~/g, " ")
    .replace(/---/g, "—")
    .replace(/--/g, "–")
    .replace(/\s+/g, " ")
    .trim();
}

const date = (s) => s.replace(/\b([A-Z][a-z]{2,3})\./g, "$1"); // "Jun. 2026" -> "Jun 2026"
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const itemKey = (s) =>
  s
    .toLowerCase()
    .replace(/\s*\(.*?\)/g, "")
    .trim(); // "Supabase (PostgreSQL)" ~ "Supabase"

// Heading macros with the \resumeItem bullets that follow each one.
function entries(body, head, arity) {
  const heads = calls(body, head, arity);
  const items = calls(body, "resumeItem", 1);
  return heads.map((h, k) => ({
    args: h.args,
    bullets: items
      .filter((it) => it.start > h.start && it.start < (heads[k + 1]?.start ?? Infinity))
      .map((it) => tex2text(it.args[0])),
  }));
}

function section(doc, title) {
  const i = doc.indexOf(`\\section{${title}`);
  if (i < 0) return "";
  const j = doc.indexOf("\\section{", i + 1);
  return doc.slice(i, j < 0 ? undefined : j);
}

// ---------- résumé -> data ----------

export function parseResume(tex) {
  const src = stripComments(tex);
  const tracks = Object.fromEntries(calls(src, "track", 2).map((c) => c.args));
  const track = (kind) => TRACKS.map((t) => tracks[`${kind}@${t}`] ?? "");
  const doc = src.slice(src.indexOf("\\begin{document}"));
  const head = doc.slice(doc.indexOf("\\begin{center}"), doc.indexOf("\\end{center}"));
  const hrefs = calls(head, "href", 2).map((c) => c.args[0]);

  const experience = new Map();
  for (const body of track("Exp"))
    for (const e of entries(body, "resumeSubheading", 4)) {
      const [role, dates, org, location] = e.args.map(tex2text);
      const key = `${role}|${org}`.toLowerCase();
      if (!experience.has(key)) experience.set(key, { role, org, dates: date(dates), location, bullets: e.bullets });
    }

  const variants = [];
  for (const body of track("Proj"))
    for (const e of entries(body, "resumeProjectHeading", 2)) {
      const [title, linkSrc] = e.args;
      const name = tex2text(calls(title, "textbf", 1)[0]?.args[0] ?? title);
      const stack = tex2text(calls(title, "emph", 1)[0]?.args[0] ?? "")
        .split(/\s*,\s*/)
        .filter(Boolean);
      const links = calls(linkSrc, "href", 2).map(({ args: [url, label] }) => ({ label: tex2text(label), url }));
      const repos = links.map((l) => l.url.match(/^https:\/\/github\.com\/[^/]+\/([^/?#]+)/)?.[1]).filter(Boolean);
      variants.push({ id: repos[0] ?? slug(name), name, repos, stack, links, bullets: e.bullets });
    }
  // A combined entry ("A & B", two repos) is dropped when every repo also has an entry of its own.
  const solo = new Set(variants.filter((v) => v.repos.length === 1).map((v) => v.repos[0]));
  const projects = new Map();
  for (const { repos, ...p } of variants) {
    if (repos.length > 1 && repos.every((r) => solo.has(r))) continue;
    const cur = projects.get(p.id);
    if (!cur || p.bullets.length > cur.bullets.length) projects.set(p.id, p); // most detailed wording wins
  }

  // GEN groups are the base; other tracks add only new items, into the same-named group or the
  // group they overlap most (e.g. AI's "GenAI & Speech" folds into "NLP, LLMs & Vision").
  const skills = [];
  for (const body of track("Skills"))
    for (const { args } of calls(body, "textbf", 2)) {
      const group = tex2text(args[0]);
      const items = tex2text(args[1])
        .replace(/^:\s*/, "")
        .split(/\s*,\s*/)
        .filter(Boolean);
      const have = new Set(skills.flatMap((g) => g.items.map(itemKey)));
      const fresh = items.filter((i) => !have.has(itemKey(i)));
      const overlap = (g) => items.filter((i) => g.items.some((x) => itemKey(x) === itemKey(i))).length;
      const target =
        skills.find((g) => g.group.toLowerCase() === group.toLowerCase()) ??
        skills.filter((g) => overlap(g) >= 2).sort((a, b) => overlap(b) - overlap(a))[0];
      if (target) target.items.push(...fresh);
      else if (fresh.length) skills.push({ group, items: fresh });
    }

  const extras = Object.fromEntries(
    calls(section(doc, "Certifications"), "textbf", 2).map(({ args: [label, body] }) => [
      tex2text(label).toLowerCase(),
      tex2text(body)
        .replace(/^:\s*/, "")
        .split(/\s*;\s*/)
        .filter(Boolean)
        .map(cap),
    ]),
  );

  return {
    name: tex2text(head.match(/\\scshape\s+([^}]*)\}/)?.[1] ?? ""),
    location: tex2text(head.match(/\\faMapMarker\*?\\?\s*([^\\\n]*)/)?.[1] ?? ""),
    email: hrefs.find((u) => u.startsWith("mailto:"))?.slice(7) ?? "",
    links: Object.fromEntries(
      hrefs
        .filter((u) => u.startsWith("http"))
        .map((u) => [new URL(u).hostname.replace(/^www\./, "").split(".")[0], u]),
    ),
    target: src.match(/Target:\s*([^\\{}]+?)\s*---/)?.[1] ?? null, // season from the \TargetLine macro
    education: calls(section(doc, "Education"), "resumeSubheading", 4).map(({ args }) => {
      const [school, dates, degree, location] = args.map(tex2text);
      return { school, degree, dates: date(dates), location };
    }),
    experience: [...experience.values()],
    projects: [...projects.values()],
    skills,
    positions: calls(section(doc, "Positions"), "resumeLine", 2).map(({ args: [what, dates] }) => {
      const [title, ...detail] = tex2text(what).split(": ");
      return { title, detail: detail.join(": "), dates: date(tex2text(dates)) };
    }),
    certifications: extras.certifications ?? [],
    achievements: extras.achievements ?? [],
  };
}

// Refuses to publish a résumé that parsed into something obviously broken.
export function problems(data) {
  const out = [];
  if (!data.name) out.push("name");
  if (!/^[^@\s]+@[^@\s]+$/.test(data.email)) out.push("email");
  for (const k of ["education", "experience", "projects", "skills"]) if (!data[k].length) out.push(k);
  if (data.projects.some((p) => !p.bullets.length)) out.push("project bullets");
  return out;
}

// ---------- files ----------

function writeIfChanged(file, data) {
  const path = join(ROOT, file);
  if (existsSync(path) && Buffer.compare(readFileSync(path), Buffer.from(data)) === 0) return false;
  writeFileSync(path, data);
  return true;
}

async function main() {
  const dir = process.argv[2] ?? process.env.RESUME_DIR ?? DEFAULT_DIR;
  const texPath = join(dir, TEX);
  if (!existsSync(texPath)) throw new Error(`Résumé not found: ${texPath} (pass the folder as an argument)`);

  const data = parseResume(readFileSync(texPath, "utf8"));
  const bad = problems(data);
  if (bad.length) throw new Error(`Résumé parse looks wrong (${bad.join(", ")}); nothing was written.`);

  const changed = [];
  const outFile = "content/resume.json";
  const old = existsSync(join(ROOT, outFile)) ? JSON.parse(readFileSync(join(ROOT, outFile), "utf8")) : {};
  const { updated, ...oldData } = old;
  if (JSON.stringify(oldData) !== JSON.stringify(data)) {
    const stamp = statSync(texPath).mtime.toISOString().slice(0, 10);
    writeFileSync(join(ROOT, outFile), `${JSON.stringify({ updated: stamp, ...data }, null, 2)}\n`);
    changed.push(`${outFile} (résumé dated ${stamp}${updated ? `, was ${updated}` : ""})`);
  }

  const pdfPath = join(dir, PDF);
  if (existsSync(pdfPath) && writeIfChanged("public/resume.pdf", readFileSync(pdfPath)))
    changed.push("public/resume.pdf");
  else if (!existsSync(pdfPath)) console.warn(`warning: ${PDF} not found, résumé PDF left as is`);

  const headers = { Accept: "application/vnd.github+json", "User-Agent": "portfolio-sync" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(REPOS_URL, { headers }).catch((e) => ({ ok: false, status: e.message }));
  if (!res.ok) console.warn(`warning: GitHub snapshot skipped (${res.status})`);
  else if (writeIfChanged("content/github.json", `${JSON.stringify((await res.json()).map(trimRepo), null, 2)}\n`))
    changed.push("content/github.json");

  console.log(changed.length ? `Updated:\n  ${changed.join("\n  ")}` : "Already up to date.");
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}
