"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useHardwareDetection } from "../hooks/useHardwareDetection";

// Components
import LoadingScreen from "@/components/automotive/LoadingScreen";
import Hero from "@/components/automotive/Hero";
import Bridge from "@/components/automotive/Bridge";
import Garage from "@/components/garage/Garage";
import Workshop from "@/components/lab/Workshop";
import Skills from "@/components/automotive/Skills";
import Logbook from "@/components/ui/Logbook";
import Terminal from "@/components/ui/Terminal";
import TurboIcon from "@/components/automotive/TurboIcon";
import FEAHeatmap from "@/components/automotive/FEAHeatmap";

const NAV_LINKS = [
  { name: "00 // IGNITION", href: "#hero" },
  { name: "01 // THE_BRIDGE", href: "#bridge" },
  { name: "02 // GARAGE", href: "#garage" },
  { name: "03 // WORKSHOP", href: "#workshop" },
  { name: "04 // SPECS", href: "#specs" },
  { name: "05 // LOGBOOK", href: "#resume" },
  { name: "06 // TRANSMIT", href: "#terminal" },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeProject, setActiveProject] = useState("ive");
  
  // 1. HARDWARE AUTO-DETECTION (RTX 3050 vs Radeon 530)
  const [isHighPerf, setIsHighPerf] = useHardwareDetection();

  // 2. SCROLL PROGRESS "FUEL GAUGE" LOGIC
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 50,   // Reduced from 100 for more "weight"
    damping: 25,     // Adjusted for smoother lag-behind
    restDelta: 0.001
  });

  useEffect(() => {
    if (isHighPerf) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isHighPerf]);

  return (
    <main className="min-h-screen bg-[#F5F5F0] dark:bg-black transition-colors duration-700 selection:bg-red-600 selection:text-white">
      {/* GLOBAL SCROLL PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-red-600 origin-left z-[1000]"
        style={{ scaleX }}
      />

      {isLoading ? (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <>
          {isHighPerf && <FEAHeatmap />}
          
          {/* NAVIGATION INTERFACE */}
          <div className="fixed top-8 right-8 z-[999] flex flex-col items-end gap-3 font-mono">
            <div className="flex items-center gap-3">
              {/* Performance Toggle */}
              <button 
                onClick={() => setIsHighPerf(!isHighPerf)}
                className={`relative flex items-center gap-3 px-6 py-2.5 rounded-full text-[9px] font-black tracking-[0.2em] transition-all duration-500 border ${
                  isHighPerf 
                  ? 'bg-zinc-900/80 backdrop-blur-xl border-red-600/50 text-white shadow-[0_0_20px_rgba(220,38,38,0.2)]' 
                  : 'bg-white/80 backdrop-blur-xl border-zinc-200 text-zinc-500 shadow-xl'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isHighPerf ? 'bg-red-600 animate-pulse' : 'bg-zinc-300'}`} />
                {isHighPerf ? "MODE: SPORT // PERFORMANCE" : "MODE: ECO // STABILITY"}
              </button>

              {/* Ignition Menu Button */}
              <div 
                onClick={() => setIsNavOpen(!isNavOpen)}
                className={`flex items-center backdrop-blur-2xl border rounded-full p-1.5 shadow-2xl cursor-pointer group transition-all duration-500 ${
                  isHighPerf ? 'bg-zinc-950/90 border-white/10' : 'bg-white/90 border-zinc-200'
                }`}
              >
                <div className="px-5 py-2 border-r border-zinc-800/20 dark:border-white/10">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-black group-hover:text-red-600 transition-colors">
                    {isNavOpen ? "CLOSE" : "IGNITION"}
                  </span>
                </div>
                <div className="px-4 py-2">
                  <TurboIcon />
                </div>
              </div>
            </div>

            <AnimatePresence>
              {isNavOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className={`border backdrop-blur-3xl p-6 rounded-2xl w-72 shadow-3xl transition-colors duration-500 ${
                    isHighPerf ? 'bg-zinc-950/95 border-white/10' : 'bg-white/95 border-zinc-200'
                  }`}
                >
                  <div className="flex flex-col gap-5">
                    {NAV_LINKS.map((link) => (
                      <a 
                        key={link.name} 
                        href={link.href}
                        onClick={() => setIsNavOpen(false)}
                        className="text-[10px] text-zinc-500 hover:text-red-600 tracking-[0.2em] transition-all flex items-center gap-4 group"
                      >
                        <span className="w-1 h-1 bg-zinc-800 group-hover:bg-red-600 transition-colors rotate-45" />
                        {link.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Hero />
          <Bridge />
          <Garage onProjectSelect={(id) => setActiveProject(id)} />
          <Workshop 
            isHighPerf={isHighPerf} 
            setIsHighPerf={setIsHighPerf} 
            activeProjectId={activeProject} 
          />
          <Skills />
          <Logbook />
          <Terminal />
        </>
      )}
    </main>
  );
}
