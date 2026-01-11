"use client";
import { motion } from "framer-motion";

interface SkillGaugeProps {
  value: number; // 0 to 100
  label: string;
  tier: string;
}

export default function SkillGauge({ value, label, tier }: SkillGaugeProps) {
  // Map 0-100 to -90deg to 90deg for the needle
  const rotation = (value / 100) * 180 - 90;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-32 h-20 overflow-hidden">
        {/* Gauge Background Arc */}
        <svg viewBox="0 0 100 50" className="w-full h-full opacity-20">
          <path d="M 10 50 A 40 40 0 0 1 90 50" stroke="#fff" strokeWidth="4" fill="none" />
        </svg>
        
        {/* Active Progress Arc */}
        <motion.svg 
          viewBox="0 0 100 50" 
          className="absolute inset-0 text-red-600"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: value / 100 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.path d="M 10 50 A 40 40 0 0 1 90 50" stroke="currentColor" strokeWidth="4" fill="none" />
        </motion.svg>

        {/* The Needle */}
        <motion.div 
          className="absolute bottom-0 left-1/2 w-1 h-16 bg-red-600 origin-bottom -ml-0.5"
          initial={{ rotate: -90 }}
          whileInView={{ rotate: rotation }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
      
      <div className="text-center mt-2 font-mono">
        <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">{tier}</p>
        <p className="text-xs font-black text-white">{label}</p>
      </div>
    </div>
  );
}
