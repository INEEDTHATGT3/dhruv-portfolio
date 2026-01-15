"use client";
import { motion } from "framer-motion";

const timeline = [
  {
    year: "2028",
    title: "B.Tech Civil Engineering",
    org: "HBTU Kanpur",
    status: "EXPECTED",
    details: ["Specializing in Structural Data Intelligence", "CGPA Target: 8.0+"]
  },
  {
    year: "2026",
    title: "Data Science Specialization",
    org: "Self-Directed / Projects",
    status: "IN_PROGRESS",
    details: [
      "Implementing 10Hz Telemetry Pipelines (IVE Project)",
      "Advanced DSA Grind (8-11 PM Daily)",
      "Mastering YOLOv8 & Computer Vision"
    ]
  },
  {
    year: "2024",
    title: "Engineering Fundamentals",
    org: "HBTU Kanpur",
    status: "COMPLETED",
    details: ["SolidWorks Mechanical Modeling", "Fluid Mechanics & Pressure Analysis"]
  }
];

export default function Logbook() {
  return (
    <section id="resume" className="min-h-screen bg-white dark:bg-black py-32 px-10 font-mono transition-colors duration-700">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-red-600 text-xs tracking-[0.5em] mb-20 uppercase font-black">Module_05 // Technical_Logbook</h2>
        
        <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 md:ml-20 space-y-20 pb-20">
          {timeline.map((item, index) => (
            <div key={index} className="relative pl-12 group">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-black border-2 border-zinc-200 dark:border-zinc-800 group-hover:border-red-600 group-hover:scale-125 transition-all duration-500 z-10" />
              
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-4">
                <span className="text-red-600 font-black text-2xl italic tracking-tighter">{item.year}</span>
                <span className="text-[10px] bg-zinc-100 dark:bg-zinc-900 px-2 py-1 text-zinc-500 dark:text-zinc-400 font-bold rounded uppercase">{item.status}</span>
              </div>

              <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-1 uppercase tracking-tight">{item.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-600 text-xs font-bold mb-6 italic">{item.org}</p>
              
              <ul className="space-y-3">
                {item.details.map((detail, i) => (
                  <li key={i} className="text-zinc-600 dark:text-zinc-400 text-sm flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-red-600 rotate-45 shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button className="border-2 border-zinc-900 dark:border-white px-10 py-4 font-black uppercase text-xs tracking-widest text-zinc-900 dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all flex items-center gap-4 group">
            DOWNLOAD_FULL_SERVICE_MANUAL (PDF)
            <span className="group-hover:translate-y-1 transition-transform">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}