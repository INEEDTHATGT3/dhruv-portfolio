"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: "ive",
    title: "INTELLIGENT VEHICLE ECOSYSTEM",
    status: "IN THE LAB",
    specs: { latency: "10ms", frequency: "10Hz", accuracy: "94.2%", stack: "KAFKA/YOLO" },
    desc: "Real-time streaming pipeline for vehicle telemetry."
  },
  {
    id: "neural",
    title: "NEURAL SPACE OS",
    status: "STABLE",
    specs: { complexity: "O(log N)", nodes: "1440px", type: "GRAPH", stack: "REACT/LATEX" },
    desc: "Recursive knowledge graph and personal OS."
  },
  // Add other projects here...
];

export default function Garage() {
  const targetRef = useRef(null);
  const { scrollXProgress } = useScroll({ target: targetRef });
  
  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x: useTransform(useScroll({ target: targetRef }).scrollYProgress, [0, 1], ["0%", "-70%"]) }} className="flex gap-20 px-20">
          {projects.map((p) => (
            <div key={p.id} className="group relative h-[500px] w-[400px] bg-zinc-900 border border-zinc-800 p-8 font-mono flex flex-col justify-between">
              <div>
                <span className="text-red-600 text-[10px] tracking-widest uppercase">{p.status}</span>
                <h3 className="text-3xl font-black text-white mt-4 leading-none">{p.title}</h3>
                <p className="text-zinc-500 text-xs mt-6 leading-relaxed">{p.desc}</p>
              </div>
              
              {/* Spec Sheet UI */}
              <div className="border-t border-zinc-800 pt-6">
                <div className="grid grid-cols-2 gap-4 text-[10px]">
                  {Object.entries(p.specs).map(([key, val]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-zinc-600 uppercase">{key}</span>
                      <span className="text-zinc-300 font-bold">{val}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-3 bg-red-600 text-white text-[10px] font-black uppercase hover:bg-white hover:text-black transition-colors">
                  Open_Hood // Case_Study
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
