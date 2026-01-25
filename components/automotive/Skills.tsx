"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, Cpu, Code2, Wrench, 
  Activity, Layers, ChevronRight, 
  CheckCircle2, Gauge, Binary
} from "lucide-react";

// --- TYPES ---
interface SpecItem {
  name: string;
  level: "REDLINE" | "HIGH-PERFORMANCE" | "CORE_TUNED";
  val: number;
}

interface Semester {
  id: string;
  status: "COMPLETED" | "ACTIVE" | "PIPELINE";
  courses: string[];
}

// --- DATA CONFIGURATION ---
const PILLARS = [
  { name: "Data Eng.", value: 85, icon: Database },
  { name: "AI/ML", value: 92, icon: Cpu },
  { name: "Civil Eng.", value: 88, icon: Layers },
  { name: "Software", value: 75, icon: Binary },
  { name: "Logic", value: 95, icon: Code2 },
];

const SKILL_STACK = {
  fuel: {
    title: "DATA_ENGINEERING // FUEL",
    specs: [
      { name: "KAFKA / SPARK STREAMING", level: "HIGH-PERFORMANCE", val: 85 },
      { name: "POSTGIS / GEOSPATIAL", level: "REDLINE", val: 92 },
      { name: "AIRFLOW / DOCKER", level: "CORE_TUNED", val: 78 },
      { name: "SUPABASE / DELTA LAKE", level: "HIGH-PERFORMANCE", val: 82 },
    ]
  },
  turbo: {
    title: "AI_INTELLIGENCE // TURBO",
    specs: [
      { name: "YOLOV8 / COMPUTER VISION", level: "REDLINE", val: 95 },
      { name: "RAG / LANGCHAIN / CREWAI", level: "HIGH-PERFORMANCE", val: 88 },
      { name: "PYTORCH / SCIKIT-LEARN", level: "REDLINE", val: 90 },
      { name: "LLAMA 3.2 / SHAP (XAI)", level: "HIGH-PERFORMANCE", val: 84 },
    ]
  },
  drivetrain: {
    title: "COMP_LOGIC // DRIVETRAIN",
    specs: [
      { name: "C++ (ADVANCED DSA)", level: "REDLINE", val: 94 },
      { name: "PYTHON (NUMPY/PANDAS)", level: "REDLINE", val: 96 },
      { name: "SQL (POSTGRESQL)", level: "HIGH-PERFORMANCE", val: 88 },
      { name: "GRAPH THEORY / DP", level: "REDLINE", val: 92 },
    ]
  },
  blueprint: {
    title: "CIVIL_FOUNDATIONS // BLUEPRINT",
    semesters: [
      { id: "SEM_01", status: "COMPLETED", courses: ["Engg Chemistry", "Intro to CS", "NCE101"] },
      { id: "SEM_02", status: "COMPLETED", courses: ["Engg Physics", "Engg Math-I", "NCE102"] },
      { id: "SEM_03", status: "COMPLETED", courses: ["NCE201 (Fluid)", "NCE207 (Geotech)", "NCE203"] },
      { id: "SEM_04", status: "ACTIVE", courses: ["NCE204 (SA-I)", "NCE206 (DCS-I)", "NCE208", "NCE210"] },
      { id: "SEM_05+", status: "PIPELINE", courses: ["Steel Design", "Hydrology", "Foundation Eng"] },
    ] as Semester[]
  }
};

// --- SUB-COMPONENT: RADAR HUD ---
const RadarHUD = ({ data }: { data: typeof PILLARS }) => {
  const size = 300;
  const center = size / 2;
  const radius = size * 0.35;
  
  const points = data.map((d, i) => {
    const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
    const x = center + radius * (d.value / 100) * Math.cos(angle);
    const y = center + radius * (d.value / 100) * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="relative flex items-center justify-center bg-zinc-900/10 rounded-sm border border-zinc-800/50 p-4">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[280px] h-auto drop-shadow-[0_0_15px_rgba(220,38,38,0.15)]">
        {[0.2, 0.4, 0.6, 0.8, 1].map((r) => (
          <polygon key={r} points={data.map((_, i) => {
            const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
            return `${center + radius * r * Math.cos(angle)},${center + radius * r * Math.sin(angle)}`;
          }).join(" ")} className="fill-none stroke-zinc-800/50 stroke-[0.5]" />
        ))}
        <polygon points={points} className="fill-red-600/10 stroke-red-600 stroke-2 transition-all duration-1000" />
        {data.map((d, i) => {
          const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
          const x = center + (radius + 25) * Math.cos(angle);
          const y = center + (radius + 15) * Math.sin(angle);
          return (
            <text key={d.name} x={x} y={y} textAnchor="middle" className="fill-zinc-500 font-mono text-[7px] font-black uppercase tracking-tighter">
              {d.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// --- MAIN MODULE ---
export default function Skills() {
  const [activeTab, setActiveTab] = useState<keyof typeof SKILL_STACK>("fuel");

  return (
    <section id="specs" className="min-h-screen bg-black py-32 px-6 md:px-10 font-mono transition-colors duration-700">
      <div className="max-w-7xl mx-auto">
        
        {/* Header HUD */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 border-b border-zinc-900 pb-10">
          <div className="border-l-2 border-red-600 pl-6">
            <h2 className="text-zinc-600 text-[9px] tracking-[0.6em] uppercase mb-2">Performance_Telemetry // V.04</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase">Technical_Specs</h3>
          </div>
          <div className="mt-8 md:mt-0 text-right opacity-60">
            <p className="text-red-600 text-[10px] font-black tracking-widest">HBTU_KANPUR_CIVIL // SEM_04</p>
            <p className="text-zinc-500 text-[8px] uppercase mt-1 tracking-widest italic">8-11 PM DSA_PROTOCOL_ACTIVE</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Pillar 01: Radar HUD & Category Select */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <Activity size={14} className="text-red-600" />
              <span className="text-[10px] text-white font-black tracking-widest uppercase">Competency_Matrix</span>
            </div>
            <RadarHUD data={PILLARS} />
            
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(SKILL_STACK) as Array<keyof typeof SKILL_STACK>).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`p-3 text-[9px] font-black tracking-widest border transition-all text-left ${
                    activeTab === key ? "bg-red-600 border-red-600 text-white" : "border-zinc-800 text-zinc-600 hover:border-zinc-500"
                  }`}
                >
                  {key.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Pillar 02: Detailed Spec Sheet */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="h-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Gauge size={16} className="text-red-600" />
                  <h4 className="text-white text-sm font-black tracking-widest uppercase italic">{SKILL_STACK[activeTab].title}</h4>
                </div>

                <div className="space-y-3">
                  {activeTab === 'blueprint' ? (
                    // Semester Timeline View
                    SKILL_STACK.blueprint.semesters.map((sem) => (
                      <div key={sem.id} className={`p-5 border ${sem.status === 'ACTIVE' ? 'border-red-600 bg-red-600/5' : 'border-zinc-900 bg-zinc-950/50'}`}>
                        <div className="flex justify-between items-center mb-3">
                          <span className={`text-[10px] font-black tracking-widest ${sem.status === 'ACTIVE' ? 'text-red-600 animate-pulse' : 'text-zinc-600'}`}>
                            [{sem.id}] // {sem.status}
                          </span>
                          {sem.status === 'COMPLETED' && <CheckCircle2 size={12} className="text-zinc-700" />}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {sem.courses.map(course => (
                            <span key={course} className="text-[9px] text-white font-bold bg-zinc-900 px-2 py-1 border border-zinc-800">
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    // Standard Skill Gauge View
                    (SKILL_STACK[activeTab] as any).specs.map((spec: SpecItem) => (
                      <div key={spec.name} className="bg-zinc-950/50 border border-zinc-900 p-5 group hover:border-red-600/50 transition-colors">
                        <div className="flex justify-between items-end mb-3">
                          <div>
                            <p className="text-[11px] text-white font-black tracking-tight mb-1">{spec.name}</p>
                            <p className={`text-[8px] font-black tracking-widest ${spec.level === 'REDLINE' ? 'text-red-600' : 'text-zinc-500'}`}>
                              {spec.level}
                            </p>
                          </div>
                          <span className="text-[10px] text-zinc-700 font-mono">{spec.val}%</span>
                        </div>
                        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${spec.val}%` }}
                            className={`h-full ${spec.level === 'REDLINE' ? 'bg-red-600' : 'bg-zinc-600'}`} 
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
