import assert from "node:assert/strict";
import test from "node:test";
import { parseResume, problems, tex2text } from "./sync-resume.mjs";

// Same macro layout as RESUME_ROLES.tex, trimmed to two tracks.
const TEX = String.raw`
\newcommand{\resumeItem}[1]{\item\small{{#1 \vspace{-2pt}}}}
\newcommand{\track}[2]{\expandafter\def\csname #1\endcsname{#2}}
\newcommand{\TargetLine}{\textit{Target: Summer 2027 --- \detokenize\expandafter{\TargetRole}}}
% Examples:  \SetTailor{AI}{AI Engineering Intern} \resumeItem{not a bullet}
\track{Exp@GEN}{%
  \resumeSubheading
    {AI Engineering Intern}{Jun. 2026 -- Jul. 2026}
    {Kinetic Sage Technologies}{Noida, India}
    \resumeItemListStart
      \resumeItem{Built a RAG pipeline for document Q\&A.}
    \resumeItemListEnd
}
\track{Proj@GEN}{%
  \resumeProjectHeading
      {\textbf{Trading Predictor} $|$ \emph{Python, Scikit-Learn}}{\href{https://github.com/me/trading}{\underline{GitHub}}}
  \resumeItemListStart
    \resumeItem{Tuned Bagging reached 91.2\% accuracy.}
  \resumeItemListEnd
  \resumeProjectHeading
      {\textbf{Space \& Voice} $|$ \emph{Flutter, Python}}{\href{https://github.com/me/space}{\underline{A}} $|$ \href{https://github.com/me/voice}{\underline{B}}}
  \resumeItemListStart
    \resumeItem{Combined entry.}
  \resumeItemListEnd
}
\track{Skills@GEN}{%
  \textbf{Languages}{: Python, C++} \\
  \textbf{NLP \& Vision}{: LangChain, RAG, Whisper}
}
\track{Proj@AI}{%
  \resumeProjectHeading
      {\textbf{Voice} $|$ \emph{Python, Ollama}}{\href{https://github.com/me/voice}{\underline{GitHub}}}
  \resumeItemListStart
    \resumeItem{Offline dictation.}
  \resumeItemListEnd
  \resumeProjectHeading
      {\textbf{Trading Predictor} $|$ \emph{Python}}{\href{https://github.com/me/trading}{\underline{GitHub}}}
  \resumeItemListStart
    \resumeItem{One.}
    \resumeItem{Two.}
  \resumeItemListEnd
}
\track{Skills@AI}{%
  \textbf{GenAI \& Speech}{: LangChain, RAG, Ollama} \\
  \textbf{Tools}{: Git, Supabase (PostgreSQL)}
}
\begin{document}
\begin{center}
    {\Huge \scshape Jane Doe} \\ \vspace{3pt}
    \small \faPhone*\ +91 00000 \quad
    \href{mailto:jane@example.com}{\faEnvelope\ jane@example.com} \quad
    \href{https://github.com/me}{\faGithub\ GitHub} \quad
    \faMapMarker*\ Noida, India\TargetLine
\end{center}
\section{Education}
  \resumeSubheading
    {HBTU}{Aug. 2024 -- May 2028}
    {B.Tech Civil Engineering --- CGPA: 7.05 / 10}{Kanpur, India}
\section{Positions of Responsibility}
    \resumeLine{\textbf{Technical Associate, ACE HBTU}: workshops, 50+ students}{Aug. 2025 -- Present} \\
\section{Certifications \& Achievements}
     \textbf{Certifications}{: Kaggle (ML); GenAI (TuteDude)} \\
     \textbf{Achievements}{: solved 210+ DSA problems (\href{https://codolio.com/x}{\underline{Codolio}}); authored a course}
\end{document}
`;

test("parses every résumé section", () => {
  const r = parseResume(TEX);
  assert.equal(r.name, "Jane Doe");
  assert.equal(r.email, "jane@example.com");
  assert.equal(r.location, "Noida, India");
  assert.equal(r.target, "Summer 2027");
  assert.deepEqual(r.links, { github: "https://github.com/me" });
  assert.deepEqual(r.education, [
    {
      school: "HBTU",
      degree: "B.Tech Civil Engineering — CGPA: 7.05 / 10",
      dates: "Aug 2024 – May 2028",
      location: "Kanpur, India",
    },
  ]);
  assert.deepEqual(r.experience, [
    {
      role: "AI Engineering Intern",
      org: "Kinetic Sage Technologies",
      dates: "Jun 2026 – Jul 2026",
      location: "Noida, India",
      bullets: ["Built a RAG pipeline for document Q&A."],
    },
  ]);
  assert.deepEqual(r.positions, [
    { title: "Technical Associate, ACE HBTU", detail: "workshops, 50+ students", dates: "Aug 2025 – Present" },
  ]);
  assert.deepEqual(r.certifications, ["Kaggle (ML)", "GenAI (TuteDude)"]);
  assert.deepEqual(r.achievements, ["Solved 210+ DSA problems (Codolio)", "Authored a course"]);
  assert.deepEqual(problems(r), []);
});

test("merges projects across tracks", () => {
  const { projects } = parseResume(TEX);
  // combined "Space & Voice" entry dropped only for repos that have their own entry: space has none, so it stays
  assert.deepEqual(
    projects.map((p) => [p.id, p.bullets.length]),
    [
      ["trading", 2],
      ["space", 1],
      ["voice", 1],
    ],
  );
  assert.deepEqual(projects[0].stack, ["Python"]); // AI track's 2-bullet wording beat GEN's 1-bullet one
  assert.deepEqual(projects[0].links, [{ label: "GitHub", url: "https://github.com/me/trading" }]);
});

test("folds overlapping skill groups into GEN groups", () => {
  assert.deepEqual(parseResume(TEX).skills, [
    { group: "Languages", items: ["Python", "C++"] },
    { group: "NLP & Vision", items: ["LangChain", "RAG", "Whisper", "Ollama"] },
    { group: "Tools", items: ["Git", "Supabase (PostgreSQL)"] },
  ]);
});

test("tex2text handles escapes, dashes and nested macros", () => {
  assert.equal(
    tex2text(String.raw`\textbf{A \& B} --- 91.2\% $|$ \href{https://x.y}{\underline{Link}}`),
    "A & B — 91.2% | Link",
  );
});

test("flags a broken parse", () => {
  assert.deepEqual(problems(parseResume("")), ["name", "email", "education", "experience", "projects", "skills"]);
});
