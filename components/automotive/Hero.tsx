"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Settings } from "lucide-react";

export default function Hero() {
  const { scrollYProgress } = useScroll();
  
  // Choice Q3-B: Turbo speed increases with scroll
  // Map scroll 0-1 to rotation 0-1080 degrees
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 1080]);

  const techStack = [
    "KAFKA", "SPARK", "YOLOV8", "POSTGIS", "PYTHON", 
    "PYTORCH", "SQL", "DOCKER", "SOLIDWORKS", "AUTOCAD"
  ];

  return (
    <section className="relative h-screen w-full bg-[#F5F5F0] overflow-hidden flex flex-col justify-center px-6 md:px-20 border-b border-zinc-200">
      
      {/* Corner HUD Markers (Ideation Implemented) */}
      <div className="absolute top-10 left-10 font-mono text-[10px] text-zinc-400 hidden md:block leading-relaxed">
        LAT: 26.4499° N // LON: 80.3319° E <br />
        HBTU_KANPUR_CIVIL // SEM_04 <br />
        SYS_STATUS: STABLE_RTX3050
      </div>

      <div className="absolute top-10 right-10 flex items-center gap-4 z-50">
        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">Navigation</span>
        <motion.div 
          style={{ rotate }}
          className="cursor-pointer text-red-600"
        >
          <Settings size={36} strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Main Typography: Choice Q2-B (Left Aligned Blueprint Style) */}
      <div className="z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="border-l-2 border-red-600 pl-6"
        >
          <h2 className="font-mono text-zinc-400 text-sm tracking-[0.4em] mb-4">
            PORTFOLIO_VER_2026.01
          </h2>
          
          <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter text-zinc-900 leading-[0.8] mb-6">
            DHRUV<br />JAISWAL
          </h1>

          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <p className="font-serif italic text-2xl md:text-4xl text-red-600">
              Data Scientist
            </p>
            <p className="font-mono text-zinc-400 text-xs uppercase tracking-widest pb-1">
              (Founded in Civil Engineering)
            </p>
          </div>
        </motion.div>
      </div>

      {/* Tech Ticker: Choice Q1-A (Data Emphasized) */}
      <div className="absolute bottom-10 left-0 w-full overflow-hidden py-4">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-16 items-center opacity-30"
        >
          {[...techStack, ...techStack].map((tech, index) => (
            <span key={index} className="font-mono text-[10px] font-bold tracking-[0.5em] text-zinc-900 flex items-center gap-4">
              {tech} <span className="text-red-600">//</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Background Scanline Overlay (Ideation Implemented) */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%]" />

    </section>
  );
}

