"use client";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, BookOpen, Activity, Target, ShieldCheck } from "lucide-react";

const TELEMETRY_LOGS = [
  {
    timestamp: "2026 // CURRENT_PIPELINE",
    event: "PROFESSIONAL_SCALING // DATA_SCIENCE",
    details: "TARGETING: 450+ LeetCode/GFG problems // 8.5 CGPA Benchmark // Finalizing IVE & Personal OS Deployment // Awaiting Research Publication // Refining stack for professional data roles.",
    type: "GOAL",
    icon: Target
  },
  {
    timestamp: "2025 // COMPETENCY_BUILD",
    event: "SKILL_ACQUISITION // CERTIFICATION",
    details: "COMPLETED: Kaggle & SolidWorks Certifications // Zerodha Technical & Fundamental Analysis Modules // 150+ LeetCode problems // 7.3 CGPA (Sem 01) // Research Paper Drafting complete // Documentation Mastery: Git, Kafka, Apache.",
    type: "MILESTONE",
    icon: ShieldCheck
  },
  {
    timestamp: "2024 // SYSTEM_IGNITION",
    event: "ACADEMIC_ENROLLMENT // HBTU_KANPUR",
    details: "Admitted to B.Tech Civil Engineering // Initiated Fundamental DSA Protocol // Cross-domain interest exploration (Civil x Data Intelligence).",
    type: "INITIAL",
    icon: BookOpen
  }
];

export default function Logbook() {
  const handleDownload = () => {
    window.open('/manuals/SAMBHAV_JAISWAL_CURRENT_RESUME.pdf', '_blank');
  };

  return (
    <section id="resume" className="min-h-screen bg-black py-32 px-6 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 border-l-2 border-red-600 pl-6">
          <h2 className="text-zinc-500 text-[10px] tracking-[0.5em] uppercase mb-2">Service_History // V.04</h2>
          {/* Mobile Typography Fix: text-3xl on mobile, text-5xl on desktop */}
          <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter italic uppercase">Technical_Logbook</h3>
        </div>

        <div className="space-y-4">
          {TELEMETRY_LOGS.map((log, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative flex gap-6 p-6 border border-zinc-900 bg-zinc-950/30 hover:border-red-600/50 transition-all"
            >
              <div className="flex flex-col items-center">
                <div className="p-3 bg-zinc-900 rounded-sm text-zinc-500 group-hover:bg-red-600/10 transition-colors">
                  <log.icon size={18} />
                </div>
                <div className="w-px h-full bg-zinc-900 mt-4 group-hover:bg-red-600/20" />
              </div>

              <div className="flex-1 pb-8">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-red-600 text-[9px] font-black tracking-widest">[{log.timestamp}]</span>
                  <span className="text-zinc-700 text-[8px] font-black border border-zinc-800 px-2 py-0.5 rounded-full">{log.type}</span>
                </div>
                {/* Mobile Typography Fix: text-base on mobile, text-lg on desktop */}
                <h4 className="text-white text-base md:text-lg font-black tracking-tight mb-2 uppercase italic">{log.event}</h4>
                <p className="text-zinc-500 text-[10px] md:text-xs leading-relaxed max-w-2xl uppercase tracking-tighter">{log.details}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button 
            onClick={handleDownload}
            className="group relative px-8 md:px-12 py-4 bg-zinc-900 border border-zinc-800 overflow-hidden transition-all hover:border-red-600 w-full md:w-auto"
          >
            <span className="relative z-10 text-white text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase">Download_Full_Service_Manual (PDF)</span>
            <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
