"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import TurboIcon from "./TurboIcon";

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const techStack = ["KAFKA", "SPARK", "YOLOV8", "POSTGIS", "PYTHON", "PYTORCH", "SQL", "DOCKER", "SOLIDWORKS", "AUTOCAD"];

  return (
    <section className="relative h-screen w-full bg-[#F5F5F0] dark:bg-black overflow-hidden flex flex-col justify-center px-6 md:px-20 transition-colors duration-700">
      {/* Blueprint Grid - Only visible in Light Mode */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-0 pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="absolute top-10 left-10 font-mono text-[10px] text-zinc-400 dark:text-zinc-600 hidden md:block leading-relaxed">
        LAT: 26.4499° N // LON: 80.3319° E <br />
        HBTU_KANPUR_CIVIL // SEM_04
      </div>

      <div className="z-10 max-w-4xl">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="border-l-2 border-red-600 pl-6">
          <h2 className="font-mono text-zinc-400 dark:text-zinc-500 text-sm tracking-[0.4em] mb-4 uppercase">System_Initialized // V.04</h2>
          {/* Change from text-8xl to text-5xl on mobile */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.8] mb-6">
          SAMBHAV<br />JAISWAL
        </h1>
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <p className="font-serif italic text-2xl md:text-4xl text-red-600">Data Scientist & AI Specialist</p>
            <p className="font-mono text-zinc-400 dark:text-zinc-500 text-xs uppercase tracking-widest pb-1">(Founded in Civil Engineering)</p>
          </div>
        </motion.div>
      </div>

      {/* Tech Ticker */}
      <div className="absolute bottom-10 left-0 w-full overflow-hidden py-4 border-y border-zinc-200 dark:border-zinc-900 bg-white/50 dark:bg-transparent">
        <motion.div animate={{ x: [0, -1000] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="flex whitespace-nowrap gap-16 items-center opacity-40 dark:opacity-20">
          {[...techStack, ...techStack].map((tech, index) => (
            <span key={index} className="font-mono text-[10px] font-black tracking-[0.5em] text-zinc-900 dark:text-white flex items-center gap-4">
              {tech} <span className="text-red-600">//</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
