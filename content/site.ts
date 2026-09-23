// Hand-written copy for the site. Everything factual — roles, dates, projects, skills, links —
// comes from content/resume.json, which `npm run sync` regenerates from the LaTeX résumé.
// Edit the résumé, not resume.json.

type ProjectCopy = { summary: string; specs?: string[] };
// `proof` keys are résumé project ids (GitHub repo names) or experience org names;
// each renders as a link to that entry on the page, and keys that no longer exist are skipped.
type Strength = { title: string; body: string; proof: string[] };

export const site = {
  url: "https://sambhavjaiswalportfolio.vercel.app",
  role: "AI & ML developer",
  pitch:
    "I turn LLMs and data into software that ships: RAG pipelines, ML models evaluated without leakage, and speech tools that run fully offline.",
  // Shown as "Available <résumé target season> · <focus>"
  focus: "AI, ML and software engineering",
  strengths: [
    {
      title: "LLM features that ship",
      body: "RAG pipelines and FastAPI services on LLM APIs that automate real business workflows.",
      proof: ["Kinetic Sage Technologies"],
    },
    {
      title: "Models you can trust",
      body: "Leakage-controlled evaluation, walk-forward validation and honest metrics: accuracy, F1 and recall reported separately, never one flattering number.",
      proof: ["algorithmic-trading-signal-predictor"],
    },
    {
      title: "AI that runs offline",
      body: "Speech and LLM pipelines on consumer hardware with Whisper, local Llama and XTTS. No per-call API bills, and the data never leaves the machine.",
      proof: ["greekg-assistant", "ai-video-redub-pipeline"],
    },
    {
      title: "Front end to deploy",
      body: "React, Next.js and Flutter interfaces on Supabase back ends, with CI that validates and deploys every change.",
      proof: ["dsa-lms", "my-neural-space"],
    },
  ] as Strength[],
  // Résumé projects left off the site, by GitHub repo name (this site is one of them).
  hidden: ["dhruv-portfolio"],
  // Display order and extra copy for résumé projects. New résumé projects show up without an
  // entry here — after these, with their résumé bullets only.
  projects: {
    "algorithmic-trading-signal-predictor": {
      summary:
        "Predicts hourly trading signals for 15 NSE stocks, tested walk-forward with a purge window so no future data leaks into training.",
      specs: [
        "68,000+ hourly OHLCV rows",
        "51 stationary features",
        "8 classifiers compared",
        "91.2% accuracy (Bagging)",
      ],
    },
    "ai-video-redub-pipeline": {
      summary:
        "Re-dubs a video's narration without any cloud service — transcribe, clean up, re-voice — and re-times the picture to match.",
      specs: ["7-stage pipeline", "Whisper → Llama 3 → XTTS v2", "Runs fully offline"],
    },
    "dsa-lms": {
      summary:
        "A self-paced DSA course that runs entirely in the browser, with spaced repetition and timed interview drills.",
      specs: ["76 lessons", "19 modules × 4 tiers", "CI-validated content"],
    },
    "greekg-assistant": {
      summary:
        "A hotkey-driven voice assistant for Windows that dictates, cleans up and pastes text, or launches apps — all on-device.",
      specs: ["On-device Whisper STT", "Local LLM via Ollama", "Wake-word trigger"],
    },
    "my-neural-space": {
      summary:
        "A cross-platform productivity app that links tasks, coursework and skills in one graph, synced live across devices.",
      specs: ["Phone, tablet and laptop", "Supabase realtime sync", "Google Calendar API"],
    },
  } as Record<string, ProjectCopy>,
};
