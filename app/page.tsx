import { ArrowUpRight, Download, Github, Linkedin, type LucideIcon, Mail } from "lucide-react";
import { Fragment } from "react";
import CopyEmail from "@/components/CopyEmail";
import TurboHero from "@/components/TurboHero";
import { site } from "@/content/site";
import { availability, formatDate, getProfile, roleLine } from "@/lib/profile";

export const revalidate = 21600; // re-pull GitHub at most every 6 hours (keep equal to GITHUB_REVALIDATE)

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const out = { target: "_blank", rel: "noopener" } as const;

function Section(props: { id: string; title: string; note?: string; children: React.ReactNode }) {
  return (
    <section id={props.id} aria-labelledby={`${props.id}-title`} className="shell">
      <div className="grid gap-6 border-t border-rule py-14 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10 md:py-20">
        <div>
          <div className="md:sticky md:top-24">
            <h2 id={`${props.id}-title`} className="label">
              {props.title}
            </h2>
            {props.note && <p className="meta mt-3 leading-relaxed">{props.note}</p>}
          </div>
        </div>
        <div className="min-w-0">{props.children}</div>
      </div>
    </section>
  );
}

// Dates and place on the left, the entry on the right — shared by experience, education and leadership.
function Entry(props: { aside: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-8">
      <p className="meta leading-relaxed">{props.aside}</p>
      <div>{props.children}</div>
    </div>
  );
}

export default async function Home() {
  const p = await getProfile();
  const [first, ...rest] = p.name.split(" ");
  const latest = p.experience[0];
  const builtAt = new Date().toISOString();
  const profiles: [string, string | undefined, LucideIcon | null][] = [
    ["GitHub", p.links.github, Github],
    ["LinkedIn", p.links.linkedin, Linkedin],
    ["Kaggle", p.links.kaggle, null],
    ["Codolio", p.links.codolio, null],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    url: site.url,
    email: `mailto:${p.email}`,
    jobTitle: site.role,
    address: { "@type": "PostalAddress", addressLocality: p.location },
    alumniOf: p.education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
    knowsAbout: p.skills.flatMap((g) => g.items),
    sameAs: Object.values(p.links).filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <header className="sticky top-0 z-30 border-b border-rule bg-paper/85 backdrop-blur-md">
        <div className="shell flex h-14 items-center justify-between gap-4">
          <a href="#top" className="wide text-[0.8rem] font-extrabold tracking-[0.08em] uppercase">
            {p.name}
          </a>
          <nav aria-label="Sections" className="flex items-center gap-6 text-sm">
            {["Experience", "Projects", "Skills", "Contact"].map((s) => (
              <a key={s} href={`#${s.toLowerCase()}`} className="hidden transition-colors hover:text-accent sm:inline">
                {s}
              </a>
            ))}
            <a href="/resume.pdf" {...out} className="btn btn-dark min-h-9 px-3 text-sm">
              <Download size={15} aria-hidden />
              Résumé
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="shell grid items-center gap-10 pt-12 pb-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:pt-16 lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-rule bg-panel py-1.5 pr-3.5 pl-3 text-sm">
              <span className="live-dot shrink-0" aria-hidden />
              {availability}
            </p>
            <h1 className="wide mt-7 text-[clamp(2.75rem,11vw,4.25rem)] md:text-[clamp(3rem,6vw,5.25rem)] leading-[0.86] font-extrabold tracking-[-0.025em] uppercase">
              {first}
              <br />
              {rest.join(" ")}
            </h1>
            <p className="meta mt-6">
              {site.role}
              {p.studyLine && ` · ${p.studyLine}`}
            </p>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-pretty">{site.pitch}</p>
            {latest && (
              <p className="mt-3 max-w-[34rem] text-graphite">
                {roleLine(latest)} ({latest.dates}).
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="/resume.pdf" {...out} className="btn btn-dark">
                <Download size={17} aria-hidden />
                Download résumé
              </a>
              <a href={`mailto:${p.email}`} className="btn btn-line">
                <Mail size={17} aria-hidden />
                Email me
              </a>
              <div className="flex items-center">
                {profiles.map(([label, href, Icon]) =>
                  !href ? null : Icon ? (
                    <a key={label} href={href} {...out} aria-label={label} className="icon-link">
                      <Icon size={20} aria-hidden />
                    </a>
                  ) : (
                    <a key={label} href={href} {...out} className="link meta px-2">
                      {label}
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
          <TurboHero />
        </section>

        <section aria-label="At a glance" className="shell pb-14">
          <dl className="plate">
            {p.facts.map(([label, value]) => (
              <div key={label} className="flex gap-2">
                <dt className="text-graphite">{label}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
            {p.lastPush && (
              <div className="flex gap-2">
                <dt className="text-graphite">Last push</dt>
                <dd className="font-medium">
                  <a href={p.lastPush.url} {...out} className="link">
                    {p.lastPush.name}
                  </a>
                  , {formatDate(p.lastPush.pushedAt)}
                </dd>
              </div>
            )}
          </dl>
        </section>

        <Section id="strengths" title="What I bring" note="Each one links to the work behind it.">
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {p.strengths.map((s) => (
              <li key={s.title} className="border-t-2 border-ink pt-4">
                <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-graphite">{s.body}</p>
                {s.proof.length > 0 && (
                  <p className="meta mt-3">
                    Proof:{" "}
                    {s.proof.map((x, i) => (
                      <span key={x.href}>
                        {i > 0 && " · "}
                        <a href={x.href} className="link text-ink">
                          {x.label}
                        </a>
                      </span>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="experience" title="Experience">
          <ol className="space-y-12">
            {p.experience.map((e) => (
              <li key={`${e.role}-${e.org}`}>
                <Entry
                  aside={
                    <>
                      {e.dates}
                      <br />
                      {e.location}
                    </>
                  }
                >
                  <h3 className="text-xl font-semibold tracking-tight">{e.role}</h3>
                  <p className="text-graphite">{e.org}</p>
                  <ul className="bullets mt-4 leading-relaxed">
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </Entry>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="projects" title="Projects" note="Every project's code is public on GitHub.">
          <div className="grid gap-4 lg:grid-cols-2">
            {p.projects.map((pr) => (
              <article key={pr.id} id={pr.id} className="card">
                <h3 className="wide text-[0.95rem] leading-snug font-bold tracking-[0.02em] uppercase">{pr.title}</h3>
                {pr.summary && <p className="mt-2.5 leading-relaxed text-graphite">{pr.summary}</p>}
                {pr.specs && (
                  <ul className="plate mt-5" aria-label="Key figures">
                    {pr.specs.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                )}
                <ul className="bullets mt-5 text-[0.95rem] leading-relaxed">
                  {pr.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
                  {pr.stack.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-4">
                    <div className="flex gap-5 text-sm font-medium">
                      {pr.links.map((l) => (
                        <a key={l.url} href={l.url} {...out} className="link inline-flex items-center gap-1">
                          {l.label === "Live" ? "Live demo" : l.label}
                          <ArrowUpRight size={14} aria-hidden />
                        </a>
                      ))}
                    </div>
                    {pr.pushedAt && <p className="meta">Updated {formatDate(pr.pushedAt, false)}</p>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {p.moreRepos.length > 0 && (
          <Section
            id="github"
            title="Also on GitHub"
            note="Other public repos, newest first. This list updates itself from GitHub."
          >
            <ul className="divide-y divide-rule border-y border-rule">
              {p.moreRepos.map((r) => (
                <li key={r.name} className="grid gap-1 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8">
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-baseline gap-x-4">
                      <a href={r.url} {...out} className="link font-mono text-[0.95rem] font-medium">
                        {r.name}
                      </a>
                      {r.homepage && (
                        <a href={r.homepage} {...out} className="link text-sm">
                          Live demo
                        </a>
                      )}
                    </p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-graphite">{r.description}</p>
                  </div>
                  <p className="meta sm:text-right">
                    {r.language} · {formatDate(r.pushedAt)}
                  </p>
                </li>
              ))}
            </ul>
            {p.links.github && (
              <a
                href={p.links.github}
                {...out}
                className="link mt-5 inline-flex items-center gap-1 text-sm font-medium"
              >
                All repositories
                <ArrowUpRight size={14} aria-hidden />
              </a>
            )}
          </Section>
        )}

        <Section id="skills" title="Skills">
          <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {p.skills.map((g) => (
              <div key={g.group}>
                <dt className="meta tracking-[0.08em] uppercase">{g.group}</dt>
                <dd className="mt-2 leading-relaxed">
                  {g.items.map((item, i) => (
                    <Fragment key={item}>
                      <span className="whitespace-nowrap">
                        {item}
                        {i < g.items.length - 1 && " ·"}
                      </span>{" "}
                    </Fragment>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="education" title="Education">
          <div className="space-y-10">
            {p.education.map((ed) => {
              const [degree, grade] = ed.degree.split(" — ");
              return (
                <Entry
                  key={ed.school}
                  aside={
                    <>
                      {ed.dates}
                      <br />
                      {ed.location}
                    </>
                  }
                >
                  <h3 className="text-xl font-semibold tracking-tight">{ed.school}</h3>
                  <p className="text-graphite">{degree}</p>
                  {grade && <p className="meta mt-1">{grade}</p>}
                </Entry>
              );
            })}
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {(
              [
                ["Certifications", p.certifications],
                ["Achievements", p.achievements],
              ] as const
            ).map(
              ([title, items]) =>
                items.length > 0 && (
                  <div key={title}>
                    <h3 className="meta tracking-[0.08em] uppercase">{title}</h3>
                    <ul className="bullets mt-3 leading-relaxed">
                      {items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                ),
            )}
          </div>
        </Section>

        {p.positions.length > 0 && (
          <Section id="leadership" title="Leadership">
            <ul className="space-y-6">
              {p.positions.map((pos) => (
                <li key={pos.title}>
                  <Entry aside={pos.dates}>
                    <p className="font-semibold">{pos.title}</p>
                    <p className="text-graphite">{cap(pos.detail)}</p>
                  </Entry>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <section id="contact" aria-labelledby="contact-title" className="bg-ink text-paper">
          <div className="shell py-20 md:py-28">
            <p className="font-mono text-sm text-aluminium">{availability}</p>
            <h2
              id="contact-title"
              className="wide mt-5 max-w-4xl text-[clamp(2.1rem,5.5vw,4rem)] leading-[0.95] font-extrabold tracking-[-0.02em] uppercase"
            >
              Building something with AI?
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-aluminium">
              Tell me what you&apos;re working on and I&apos;ll tell you where I&apos;d start. Email gets the fastest
              reply.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={`mailto:${p.email}`} className="btn btn-light">
                <Mail size={17} aria-hidden />
                {p.email}
              </a>
              <CopyEmail email={p.email} />
              <a href="/resume.pdf" {...out} className="btn btn-ghost">
                <Download size={17} aria-hidden />
                Résumé (PDF)
              </a>
            </div>
            <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {profiles.map(
                ([label, href]) =>
                  href && (
                    <a key={label} href={href} {...out} className="link inline-flex items-center gap-1">
                      {label}
                      <ArrowUpRight size={14} aria-hidden />
                    </a>
                  ),
              )}
            </p>
          </div>
        </section>
      </main>

      <footer className="shell py-8">
        <dl className="plate">
          {[
            ["Sheet", `${p.name} — portfolio`],
            ["Résumé synced", formatDate(p.updated)],
            ["GitHub data", "Refreshed every 6 hours"],
            ["Page built", formatDate(builtAt)],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col gap-0.5">
              <dt className="text-[0.7rem] tracking-[0.08em] text-graphite uppercase">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p className="meta mt-4">Built with Next.js and three.js. The 3D view picks its detail level from your GPU.</p>
      </footer>
    </>
  );
}
