"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

interface Project {
  id: string;
  title: string;
  status: string;
  frontHighlights: string[];
  realWorldProblem: string;
  techImplementation: string;
  specs: { [key: string]: string };
  manualPath: string;
}

const tunedProjects: Project[] = [
  {
    id: "ive",
    title: "INTELLIGENT VEHICLE ECOSYSTEM",
    status: "IN THE LAB",
    frontHighlights: ["10Hz Telemetry Ingestion", "YOLOv8 Perception", "DP Gear Optimization"],
    realWorldProblem: "Autonomous fleets generate massive data streams causing decision latency. This project ensures 100+ vehicles optimize performance in real-time.",
    techImplementation: "Built a Star Schema in PostGIS with Kafka-Spark streaming. Implemented Bellman Equation via DP to solve the Optimal Gear Shift Problem.",
    specs: { latency: "10ms", freq: "10Hz", engine: "Kafka/Spark" },
    manualPath: "/manuals/ive-draft.pdf"
  },
  {
    id: "infra",
    title: "SMART INFRASTRUCTURE MANAGER",
    status: "RESEARCH",
    frontHighlights: ["Structural Health Monitoring", "Survival Analysis", "Budget Optimization"],
    realWorldProblem: "Manual bridge inspections are slow. This platform predicts structural failure, allowing mathematical allocation of maintenance budgets.",
    techImplementation: "Used Cox Proportional Hazards for forecasting. Optimized budgets via 0/1 Knapsack DP and Dijkstra's algorithm for routing.",
    specs: { data: "PostGIS", vision: "ResNet", algo: "Knapsack DP" },
    manualPath: "/manuals/infra-draft.pdf"
  },
  {
    id: "neural",
    title: "MY NEURAL SPACE (PERSONAL OS)",
    status: "STABLE",
    frontHighlights: ["GCal Mimicry Grid", "Behavioral Triad Math", "Attendance CSP"],
    realWorldProblem: "Transitioning from Civil to Data Science requires extreme time auditing. This system mimics Google Calendar for 1-minute precision scheduling.",
    techImplementation: "Developed a 1440px grid (1px=1min) for scheduling. Modeled HBTU attendance as a CSP and implemented non-linear behavioral auditing.",
    specs: { sync: "Supabase", frontend: "Flutter", logic: "CSP Solver" },
    manualPath: "/manuals/personal_os-draftMode.pdf"
  },
  {
    id: "fintech",
    title: "AGENTIC FINTECH ECOSYSTEM",
    status: "IN THE LAB",
    frontHighlights: ["Llama 3.2 NLP Parsing", "Explainable AI (XAI)", "Monte Carlo Simulation"],
    realWorldProblem: "Traditional credit scoring is a 'black box'. This ecosystem provides transparent approvals and simulates 1,000+ market scenarios.",
    techImplementation: "Integrated local Llama 3.2 for parsing and XGBoost with SHAP for XAI. Utilized Monte Carlo and DP-based asset allocation.",
    specs: { llm: "Llama 3.2", etl: "Airflow", storage: "DeltaLake" },
    manualPath: "/manuals/fintech-draft.pdf"
  }
];

export default function Garage({ onProjectSelect }: { onProjectSelect: (id: string) => void }) {
  return (
    <section id="garage" className="bg-[#F5F5F0] dark:bg-black py-32 transition-colors duration-700">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-red-600 text-xs tracking-[0.5em] mb-20 uppercase font-black">Module_02 // Technical_Spec_Stack</h2>
        
        <div className="space-y-[30vh]">
          {tunedProjects.map((p, i) => (
            <div key={p.id} className="sticky top-32 pb-20">
              <motion.div 
                initial={{ y: 50, opacity: 0 }} 
                whileInView={{ y: 0, opacity: 1 }} 
                viewport={{ margin: "-100px" }}
                className="group relative w-full h-[600px] md:h-[500px] p-8 md:p-12 font-mono shadow-2xl rounded-sm transition-all duration-700 overflow-hidden border
                  bg-white border-zinc-200 text-zinc-900 
                  dark:bg-zinc-900/40 dark:backdrop-blur-xl dark:border-white/5 dark:text-white
                  hover:border-red-600"
              >
                {/* --- FRONT OF CARD --- */}
                <div className="relative h-full flex flex-col justify-between z-0 group-hover:opacity-0 transition-opacity duration-300">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-red-600 text-[10px] font-black tracking-widest uppercase border border-red-600/30 px-2 py-1">{p.status}</span>
                      <span className="text-zinc-400 dark:text-zinc-600 text-[10px]">SPEC_SHEET_0{i + 1}</span>
                    </div>
                    <h3 className="text-4xl font-black mt-10 leading-none italic tracking-tighter uppercase">{p.title}</h3>
                    <div className="mt-12 space-y-4">
                      <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.3em]">Highlights:</p>
                      <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 text-xs">
                        {p.frontHighlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-red-600 rotate-45" /> {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="border-t border-zinc-100 dark:border-zinc-800 pt-8">
                    <div className="grid grid-cols-2 gap-y-4 text-[10px]">
                      {Object.entries(p.specs).map(([key, val]) => (
                        <div key={key} className="flex flex-col">
                          <span className="text-zinc-400 dark:text-zinc-600 uppercase font-bold">{key}</span>
                          <span className="font-bold">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* --- BACK OF CARD (HOVER FLIP) --- */}
                <div className="absolute inset-0 p-8 md:p-12 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-start border-2 border-red-600 z-10 bg-white dark:bg-zinc-950 overflow-y-auto">
                  <div className="space-y-8 text-left">
                    <div>
                      <h4 className="text-red-600 text-[10px] font-black uppercase mb-2 underline underline-offset-4 decoration-red-600/20">01. Real-World Problem Solved</h4>
                      <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">{p.realWorldProblem}</p>
                    </div>
                    <div>
                      <h4 className="text-red-600 text-[10px] font-black uppercase mb-2 underline underline-offset-4 decoration-red-600/20">02. Technical Implementation</h4>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed italic">{p.techImplementation}</p>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col md:flex-row gap-4 pt-8">
                    <button 
                    onClick={() => {
                    // 1. Update the active project ID for the Workshop
                    onProjectSelect(p.id);
    
                    // 2. Smoothly scroll the user to the Workshop section
                    document.getElementById('workshop')?.scrollIntoView({ 
                   behavior: 'smooth',
                  block: 'start'
                    });
                  }}
                  className="flex-1 py-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-black transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                  Enter_Laboratory →
                  </button>
                   <a 
                    href={p.manualPath} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 py-4 bg-transparent border border-zinc-200 dark:border-zinc-800 text-zinc-400 text-[10px] font-black uppercase tracking-widest hover:border-red-600 hover:text-red-600 transition-all text-center flex items-center justify-center">
                    Technical_Draft (PDF) ↓
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
