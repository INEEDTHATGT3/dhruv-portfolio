"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, PerspectiveCamera, Float, Html, Loader } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Box, Activity, Share2 } from "lucide-react";

interface WorkshopProps {
  isHighPerf: boolean;
  activeProjectId: string;
}

type TabType = "3D_RENDER" | "SYSTEM_MID" | "UPLINKS";

const projectMetadata: { [key: string]: any } = {
  ive: { title: "VEHICLE_TELEMETRY", repo: "ive-core", demo: "ive-dash", units: "NCE201_UNIT_IV", color: "#ef4444" },
  infra: { title: "STRUCTURAL_SURVIVAL", repo: "infra-manager", demo: "geospatial-hud", units: "NCE207_UNIT_III", color: "#3b82f6" },
  neural: { title: "COGNITIVE_OS", repo: "neural-space", demo: "os-preview", units: "NCE102_UNIT_V", color: "#10b981" },
  fintech: { title: "AGENTIC_WEALTH", repo: "fintech-eco", demo: "monte-carlo-sim", units: "NCE204_UNIT_II", color: "#f59e0b" }
};

export default function Workshop({ isHighPerf, activeProjectId }: WorkshopProps) {
  const [activeTab, setActiveTab] = useState<TabType>("3D_RENDER");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isInjecting, setIsInjecting] = useState(false);

  function Model({ isWireframe, isMobile, isHighPerf }: { isWireframe: boolean; isMobile: boolean; isHighPerf: boolean }) {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial 
          color="#ef4444" 
          // Choice Q3-B: Force wireframe in Eco Mode
          wireframe={!isHighPerf || isWireframe} 
          emissive="#ef4444"
          emissiveIntensity={(!isHighPerf || isWireframe) ? 5 : 0}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
  }

  // Choice Q2-A: State Reset on Project Change
  useEffect(() => {
    setActiveTab("3D_RENDER");
    setIsInjecting(true);
    setLoadingProgress(0);
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsInjecting(false), 400);
          return 100;
        }
        return prev + 10;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [activeProjectId]);

  const activeColor = projectMetadata[activeProjectId]?.color || "#ef4444";

  return (
    <section className="relative h-screen w-full bg-[#050505] overflow-hidden font-mono border-t border-zinc-900">
      
      {/* 1. Dashboard Push-Buttons (Choice Q1-A) */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 flex gap-2 bg-zinc-950 p-2 border border-zinc-800 rounded-sm shadow-2xl">
        {(["3D_RENDER", "SYSTEM_MID", "UPLINKS"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-[9px] font-black tracking-[0.2em] transition-all border-t-2 ${
              activeTab === tab 
              ? `bg-zinc-900 text-white border-red-600 shadow-[inset_0_0_10px_rgba(220,38,38,0.2)]` 
              : 'bg-zinc-950 text-zinc-600 border-transparent hover:text-zinc-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 2. Injection Overlay */}
      <AnimatePresence>
        {isInjecting && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-center space-y-2">
              <p className="text-red-600 text-[10px] font-black animate-pulse">SYNCHRONIZING_ASSETS...</p>
              <div className="w-32 'h-[1px]' bg-zinc-800 mx-auto overflow-hidden">
                <motion.div className="h-full bg-red-600" initial={{ x: "-100%" }} animate={{ x: "0%" }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Display Area */}
      <div className="h-full w-full pt-20">
        <AnimatePresence mode="wait">
          {activeTab === "3D_RENDER" && (
            <motion.div key="3d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full w-full">
              <Canvas shadows gl={{ antialias: isHighPerf }}>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
                <Suspense fallback={null}>
                  {/* Choice Q3-A: Dynamic Lighting based on project color */}
                  <Stage environment="night" intensity={0.5} shadows={isHighPerf ? "contact" : false}>
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                      <mesh castShadow receiveShadow>
                        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                        <meshStandardMaterial color={activeColor} wireframe={isInjecting} roughness={0.1} metalness={0.8} />
                      </mesh>
                    </Float>
                  </Stage>
                </Suspense>
                <OrbitControls enableZoom={false} autoRotate={!isInjecting} />
                <spotLight position={[5, 10, 5]} intensity={2} color={activeColor} castShadow />
              </Canvas>
            </motion.div>
          )}

          {activeTab === "SYSTEM_MID" && (
            <motion.div key="mid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full flex items-center justify-center p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                <div className="border border-zinc-800 bg-zinc-900/20 p-8 rounded-sm">
                  <h4 className="text-red-600 text-[10px] font-black uppercase mb-6 tracking-widest flex items-center gap-2">
                    <Activity size={14} /> Technical_Logic_Source
                  </h4>
                  <div className="space-y-4 text-[11px] text-zinc-400 uppercase leading-relaxed">
                    <p className="text-white font-bold tracking-tighter border-b border-zinc-800 pb-2">Academic_Anchor: {projectMetadata[activeProjectId]?.units}</p>
                    <p>• Distributed State Persistence via Supabase</p>
                    <p>• Mathematical Optimization: Bellman Equation</p>
                    <p>• Hardware Target: RTX_3050_Cuda_Cores</p>
                  </div>
                </div>
                <div className="border border-zinc-800 bg-zinc-900/20 p-8 rounded-sm flex flex-col justify-center items-center">
                   <Box className="text-zinc-800 mb-4" size={48} />
                   <p className="text-zinc-600 text-[9px] uppercase tracking-widest text-center italic">System_Architecture_Viz_Downlinking...</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "UPLINKS" && (
            <motion.div key="links" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex items-center justify-center">
              <div className="flex flex-col gap-4 w-full max-w-md">
                <a href={`https://github.com/INEEDTHATGT3/${projectMetadata[activeProjectId]?.repo}`} target="_blank" className="flex items-center justify-between p-6 bg-zinc-900 border border-zinc-800 hover:border-red-600 transition-all group">
                  <div className="flex items-center gap-4">
                    <Github className="text-zinc-500 group-hover:text-white" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest transition-all">Source_Code_Repository</span>
                  </div>
                  <ExternalLink size={14} className="text-zinc-700 group-hover:text-red-600" />
                </a>
                <a href={`https://${projectMetadata[activeProjectId]?.demo}.streamlit.app`} target="_blank" className="flex items-center justify-between p-6 bg-zinc-900 border border-zinc-800 hover:border-red-600 transition-all group">
                  <div className="flex items-center gap-4">
                    <Share2 className="text-zinc-500 group-hover:text-white" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest transition-all">Live_Deployment_Dashboard</span>
                  </div>
                  <ExternalLink size={14} className="text-zinc-700 group-hover:text-red-600" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Footer HUD */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-1">
         <div className="flex items-center gap-3">
            <div className="w-1 h-1 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[10px] text-white font-black italic tracking-tighter uppercase">
              {projectMetadata[activeProjectId]?.title}_LAB_ENVIRONMENT
            </span>
         </div>
         <span className="text-[8px] text-zinc-600 uppercase ml-4 tracking-[0.2em]">Operator: Sambhav_Jaiswal</span>
      </div>
    </section>
  );
}
