"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Bridge() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Choice Q1-B: Morphing/Scaling effect on scroll
  const xLeft = useTransform(scrollYProgress, [0.3, 0.5], [-100, 0]);
  const xRight = useTransform(scrollYProgress, [0.3, 0.5], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  const mappings = [
    { 
      civil: "NCE201 // FLUID MECHANICS", 
      civilDetail: "Unit IV: Flow in Pipes & Losses", 
      data: "KAFKA // DATA STREAMING", 
      dataDetail: "High-Throughput Ingestion & Buffer Dynamics",
      logic: "Managing 'Head Loss' in pipes is mathematically identical to managing 'Latency' in data pipelines."
    },
    { 
      civil: "NCE207 // GEOTECHNICAL-I", 
      civilDetail: "Unit III: Consolidation Theory", 
      data: "ML // OPTIMIZATION", 
      dataDetail: "Gradient Descent & Loss Convergence",
      logic: "Soil settlement over time (Consolidation) mimics the convergence of a Neural Network toward a global minimum."
    },
    { 
      civil: "NCE102 // ENG. GRAPHICS", 
      civilDetail: "Unit IV: Isometric Projections", 
      data: "CV // OBJECT DETECTION", 
      dataDetail: "Spatial 3D Reconstruction from 2D Frames",
      logic: "Projecting 3D objects onto 2D planes (SolidWorks) is the inverse of Computer Vision (YOLOv8) interpreting 3D space from pixels."
    },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-white py-32 font-mono overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div style={{ opacity }} className="text-center mb-24">
          <h2 className="text-red-600 text-xs tracking-[0.6em] uppercase mb-4 font-black">Module_02 // The_Bridge</h2>
          <h3 className="text-5xl font-black tracking-tighter text-zinc-900">STRUCTURAL DATA INTELLIGENCE</h3>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0 border border-zinc-200 overflow-hidden">
          {/* Vertical Red Line */}
          <div className="absolute inset-y-0 left-1/2 w-px bg-red-600/30 border-r border-dashed border-red-600 hidden md:block z-20" />

          {mappings.map((item, i) => (
            <motion.div key={i} className="contents">
              {/* Left Side: Civil */}
              <motion.div 
                style={{ x: xLeft, opacity }}
                className="p-12 bg-[#FAFAFA] border-b border-zinc-100 flex flex-col justify-center group cursor-crosshair"
              >
                <span className="text-red-600 text-[10px] font-black mb-2 opacity-0 group-hover:opacity-100 transition-opacity">FEA_STRESS_ANALYSIS_ACTIVE</span>
                <h4 className="text-zinc-400 text-xs mb-1 font-bold">{item.civil}</h4>
                <p className="text-xl font-black text-zinc-800">{item.civilDetail}</p>
              </motion.div>

              {/* Right Side: Data */}
              <motion.div 
                style={{ x: xRight, opacity }}
                className="p-12 bg-white border-b border-zinc-100 flex flex-col justify-center md:items-end text-right group cursor-terminal"
              >
                <span className="text-red-600 text-[10px] font-black mb-2 opacity-0 group-hover:opacity-100 transition-opacity">DATA_FLOW_STABLE</span>
                <h4 className="text-zinc-400 text-xs mb-1 font-bold">{item.data}</h4>
                <p className="text-xl font-black text-zinc-800">{item.dataDetail}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Choice Q3-B: Mathematical Reveal Quote */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="mt-24 border-y border-zinc-200 py-8 text-center group cursor-pointer"
        >
          <p className="text-zinc-300 group-hover:text-red-600 transition-colors text-xs tracking-widest mb-2">FINAL_EQUATION</p>
          <p className="text-2xl font-serif italic text-zinc-400 group-hover:text-zinc-900 transition-colors px-4">
            "Engineering is Engineering — The Mathematics is Same"
          </p>
        </motion.div>
      </div>
    </section>
  );
}

