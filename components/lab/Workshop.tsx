"use client";

import React, { Suspense, useState, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage, PerspectiveCamera, Float, Environment, TorusKnot, Icosahedron, Cylinder, Torus, Lathe, Box as Box3D } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Activity, Box as LucideBox, Share2, ChevronRight, Database, Wrench, AlertTriangle } from "lucide-react";
import * as THREE from "three";

interface WorkshopProps {
  isHighPerf: boolean;
  setIsHighPerf: (val: boolean) => void;
  activeProjectId: string; 
}

type OptionType = "VISUAL_DISPLAY" | "TECH_SPECS" | "UPLINKS";

const projectMetadata: { [key: string]: any } = {
  ive: { 
    title: "VEHICLE_TELEMETRY", visualType: "PENDING", status: "PHASE_04: STABLE_INGESTION",
    description: "Current: 10Hz Kafka pipeline active. // Previous: Resolved buffer overflow in Spark streaming.",
    repo: "ive-core", demo: "ive-dash", color: "#ef4444"
  },
  fintech: { 
    title: "AGENTIC_FINTECH", visualType: "PENDING", status: "PHASE_01: ARCHITECTURE",
    description: "Current: Designing Llama 3.2 NLP parser. // Previous: Market volatility data cleaning complete.",
    repo: "fintech-eco", demo: "wealth-sim", color: "#f59e0b"
  },
  personal_os: { 
    title: "NEURAL_SPACE", visualType: "PENDING", status: "PHASE_03: UI_SYNC",
    description: "Current: Flutter-Supabase sync optimization. // Previous: 1440px grid logic implemented.",
    repo: "neural-space", demo: "os-preview", color: "#10b981"
  },
  infra: { 
    title: "SMART_INFRA", visualType: "PENDING", status: "PHASE_02: MODELING",
    description: "Current: Structural survival math verified. // Previous: SolidWorks schematic finalized.",
    repo: "infra-manager", demo: "geospatial-hud", color: "#3b82f6"
  },
  solidworks: {
    title: "MECHANICAL_LAB", visualType: "3D_MULTI",
    models: [
      { id: "knot", name: "TORUS_KNOT", type: "knot" },
      { id: "plate", name: "CLUTCH_ASSEMBLY", type: "plate" },
      { id: "flask", name: "LAB_GLASSWARE", type: "flask" }
    ],
    status: "ENGINEERING_ARCHIVE",
    description: "Showcase of HBTU Civil Engineering mechanical modeling. // High-fidelity procedural reconstructions.",
    repo: "solidworks-archive", color: "#ffffff"
  }
};

export default function Workshop({ isHighPerf, setIsHighPerf, activeProjectId: garageId }: WorkshopProps) {
  const [activeSection, setActiveSection] = useState(garageId);
  const [activeOption, setActiveOption] = useState<OptionType>("VISUAL_DISPLAY");
  const [activeSWModel, setActiveSWModel] = useState(0);
  const [isInjecting, setIsInjecting] = useState(false);

  useEffect(() => {
    setActiveSection(garageId);
    setIsInjecting(true);
    const timer = setTimeout(() => setIsInjecting(false), 600);
    return () => clearTimeout(timer);
  }, [garageId]);

  const currentData = projectMetadata[activeSection] || projectMetadata["ive"];

  const flaskPoints = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 20; i++) {
      const x = i < 10 ? Math.sin(i * 0.3) * 1.5 + 0.5 : 0.6;
      pts.push(new THREE.Vector2(x, (i - 10) * 0.4));
    }
    return pts;
  }, []);

  const ProceduralModel = ({ type, color }: { type: string, color: string }) => {
    const materialProps = {
      color: isHighPerf ? "#ffffff" : color,
      metalness: 0.9, roughness: 0.1, emissive: color, emissiveIntensity: 0.1, wireframe: !isHighPerf
    };

    switch (type) {
      case "plate":
        return (
          <group>
            <Cylinder args={[1.5, 1.5, 0.2, 64]}><meshPhysicalMaterial {...materialProps} /></Cylinder>
            {Array.from({ length: 12 }).map((_, i) => (
              <group key={i} rotation={[0, (i * Math.PI * 2) / 12, 0]}>
                <Cylinder args={[0.1, 0.1, 0.4, 16]} position={[1.2, 0.1, 0]}><meshPhysicalMaterial {...materialProps} color="#666" /></Cylinder>
              </group>
            ))}
          </group>
        );
      case "flask":
        return (
          <group>
            <Lathe args={[flaskPoints, 64]}><meshPhysicalMaterial {...materialProps} opacity={0.3} transparent transmission={1} thickness={0.5} /></Lathe>
          </group>
        );
      case "knot":
        return <TorusKnot args={[1, 0.35, 256, 32]}><meshPhysicalMaterial {...materialProps} /></TorusKnot>;
      default:
        return (
          <Icosahedron args={[1.5, 2]}>
            <meshStandardMaterial wireframe color={color} emissive={color} emissiveIntensity={2} />
          </Icosahedron>
        );
    }
  };

  return (
    <section id="workshop" className="relative h-screen w-full bg-[#030303] overflow-hidden font-mono border-t border-zinc-900 text-white">
      <div className="absolute top-10 left-0 w-full z-40 flex flex-col items-center gap-6 px-4">
        <div className="flex gap-2 bg-zinc-950/80 backdrop-blur-md p-1 border border-zinc-800 rounded-sm shadow-2xl">
          {["VISUAL_DISPLAY", "TECH_SPECS", "UPLINKS"].map((opt) => (
            <button key={opt} onClick={() => setActiveOption(opt as OptionType)} className={`px-4 py-2 text-[9px] font-black ${activeOption === opt ? "bg-red-600 text-white" : "text-zinc-600"}`}>
              {opt}
            </button>
          ))}
        </div>

        {activeSection === "solidworks" && activeOption === "VISUAL_DISPLAY" && (
          <div className="flex flex-wrap justify-center gap-3">
            {currentData.models.map((m: any, i: number) => (
              <button key={m.id} onClick={() => setActiveSWModel(i)} className={`text-[8px] px-3 py-1 border border-zinc-800 rounded-full ${activeSWModel === i ? "bg-white text-black" : "text-zinc-500"}`}>
                {m.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SIDEBAR HUD */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-6 z-40 hidden lg:flex border-l border-zinc-900 pl-6">
        {Object.keys(projectMetadata).map((key, idx) => (
          <button key={key} onClick={() => setActiveSection(key)} className={`text-left transition-all ${activeSection === key ? "translate-x-2" : "opacity-30"}`}>
            <p className="text-[7px] text-zinc-500 mb-1">SEC_0{idx + 1}</p>
            <p className={`text-[10px] font-black tracking-widest ${activeSection === key ? "text-red-600" : "text-white"}`}>{key.toUpperCase()}</p>
          </button>
        ))}
      </div>

      <div className="h-full w-full">
        <AnimatePresence mode="wait">
          {activeOption === "VISUAL_DISPLAY" && (
            <motion.div key={`${activeSection}-${activeSWModel}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full relative">
              {isHighPerf ? (
                <>
                  <Canvas shadows dpr={[1, 2]}>
                    <Suspense fallback={null}>
                      <Stage environment="night" intensity={0.5} shadows="contact">
                        <Float speed={2}><ProceduralModel type={activeSection === "solidworks" ? currentData.models[activeSWModel].type : currentData.visualType} color={currentData.color} /></Float>
                      </Stage>
                    </Suspense>
                    <OrbitControls enableZoom={false} autoRotate={!isInjecting} />
                  </Canvas>
                  {currentData.visualType === "PENDING" && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                      <AlertTriangle size={24} className="text-red-600 mx-auto mb-4 animate-pulse" />
                      <p className="text-[10px] text-white font-black tracking-[0.4em] uppercase">Visual_Asset_Pending</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-8 p-10">
                  <LucideBox size={100} className="text-zinc-800 animate-pulse" />
                  <div className="text-center space-y-4 max-w-xs">
                    <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase">Static_Diagnostic_Mode</p>
                    <p className="text-[8px] text-zinc-600 leading-relaxed uppercase">System detected low-power hardware. 3D rendering deactivated to preserve chassis integrity.</p>
                    <button onClick={() => setIsHighPerf(true)} className="text-red-600 text-[8px] font-black underline underline-offset-4">FORCE_SPORT_MODE</button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeOption === "TECH_SPECS" && (
            <motion.div key="tech" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="h-full flex items-center justify-center p-6">
              <div className="max-w-xl w-full border border-zinc-800 bg-zinc-900/10 p-8">
                <div className="flex items-center gap-3 mb-8 border-b border-zinc-800 pb-4">
                  <Activity size={16} className="text-red-600" />
                  <h3 className="text-[11px] font-black tracking-widest uppercase">{currentData.status}</h3>
                </div>
                <p className="text-zinc-300 text-xs leading-relaxed uppercase">{currentData.description}</p>
              </div>
            </motion.div>
          )}

          {activeOption === "UPLINKS" && (
            <motion.div key="up" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex items-center justify-center">
               <div className="flex flex-col gap-4 w-full max-w-xs">
                  <a href={`https://github.com/INEEDTHATGT3/${currentData.repo}`} target="_blank" className="flex items-center justify-between p-4 border border-zinc-800 bg-zinc-950 hover:border-red-600 transition-all group">
                    <Github size={16} className="text-zinc-600 group-hover:text-white" />
                    <span className="text-[10px] font-black tracking-widest uppercase">Source_Repo</span>
                    <ChevronRight size={12} className="text-red-600" />
                  </a>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-10 right-10 flex justify-between items-center border-t border-white/5 pt-6">
        <div className="flex items-center gap-4">
          <Database size={14} className="text-red-600" />
          <div>
            <p className="text-[10px] font-black tracking-widest uppercase">{currentData.title}</p>
            <p className="text-[8px] text-zinc-600 tracking-widest uppercase">GPU: {isHighPerf ? "RTX_3050" : "ECO_MODE"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
