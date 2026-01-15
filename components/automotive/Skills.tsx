"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Cpu, Sigma, Building2, Code2, AppWindow, Activity, Box } from "lucide-react";

// --- DATA CONFIGURATION ---
const PILLARS = [
  { name: "Data Eng.", value: 85, icon: Database },
  { name: "AI/ML", value: 92, icon: Cpu },
  { name: "Math/Stats", value: 80, icon: Sigma },
  { name: "Civil Eng.", value: 88, icon: Building2 },
  { name: "Software", value: 75, icon: AppWindow },
  { name: "Logic", value: 90, icon: Code2 },
];

const HYBRID_SPECS = [
  { name: "YOLOv8 / COMPUTER VISION", level: "REDLINE", cat: "AI" },
  { name: "SOLIDWORKS / MECHANICAL", level: "TUNED", cat: "CIVIL" },
  { name: "C++ / ADVANCED DSA", level: "REDLINE", cat: "LOGIC" },
  { name: "KAFKA / SPARK STREAMING", level: "TUNED", cat: "DATA" },
  { name: "POSTGIS / GEOSPATIAL", level: "REDLINE", cat: "DATA" },
  { name: "PYTORCH / DEEP LEARNING", level: "STAGE_2", cat: "AI" },
  { name: "AUTOCAD / BLUEPRINTING", level: "TUNED", cat: "CIVIL" },
  { name: "FASTAPI / DOCKER", level: "STAGE_2", cat: "SOFT" },
];

// --- SUB-COMPONENT: RADAR HUD ---
const RadarHUD = ({ data }: { data: typeof PILLARS }) => {
  const size = 300;
  const center = size / 2;
  const radius = size * 0.4;
  
  const points = data.map((d, i) => {
    const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
    const x = center + radius * (d.value / 100) * Math.cos(angle);
    const y = center + radius * (d.value / 100) * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="relative flex items-center justify-center bg-zinc-900/20 rounded-sm border border-zinc-800 p-4">
      <svg viewBox={`0 0 ${size} ${size}`}className="w-full max-w-[300px] h-auto drop-shadow-[0_0_10px_rgba(220,38,38,0.2)]">
        {/* Background Hexagon Rings */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((r) => (
          <polygon
            key={r}
            points={data.map((_, i) => {
              const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
              return `${center + radius * r * Math.cos(angle)},${center + radius * r * Math.sin(angle)}`;
            }).join(" ")}
            className="fill-none stroke-zinc-800 stroke-1"
          />
        ))}
        {/* Data Polygon */}
        <polygon
          points={points}
          className="fill-red-600/20 stroke-red-600 stroke-2 transition-all duration-500"
        />
        {/* Axis Labels */}
        {data.map((d, i) => {
          const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
          const x = center + (radius + 25) * Math.cos(angle);
          const y = center + (radius + 20) * Math.sin(angle);
          return (
            <text
              key={d.name}
              x={x}
              y={y}
              textAnchor="middle"
              className="fill-zinc-500 font-mono text-[8px] font-black uppercase tracking-tighter"
            >
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
  return (
    <section id="specs" className="min-h-screen bg-black py-32 px-6 md:px-10 font-mono transition-colors duration-700">
      <div className="max-w-7xl mx-auto">
        
        {/* Header HUD */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 border-b border-zinc-900 pb-8">
          <div className="border-l-2 border-red-600 pl-6">
            <h2 className="text-zinc-500 text-[10px] tracking-[0.5em] uppercase mb-2">System_Diagnostics // V.04</h2>
            <h3 className="text-5xl font-black text-white tracking-tighter italic uppercase">Performance_Specs</h3>
          </div>
          <div className="mt-6 md:mt-0 text-right">
            <p className="text-red-600 text-[10px] font-black tracking-widest">HBTU_KANPUR // CIVIL_SEM_04</p>
            <p className="text-zinc-600 text-[9px] uppercase mt-1">Telemetry Status: Synchronized</p>
          </div>
        </div>

        {/* Bento Grid Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Pillar 01: Radar HUD */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity size={14} className="text-red-600" />
              <span className="text-[10px] text-white font-black tracking-widest uppercase">Competency_Radar</span>
            </div>
            <RadarHUD data={PILLARS} />
            <div className="p-4 bg-zinc-900/10 border border-zinc-800 rounded-sm">
              <p className="text-[9px] text-zinc-500 leading-relaxed italic">
                // Analysis indicates peak performance in AI/ML and Computational Logic. 
                Structural engineering foundations remain active as primary chassis.
              </p>
            </div>
          </div>

          {/* Pillar 02: Hybrid Spec Sheet */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <Box size={14} className="text-red-600" />
              <span className="text-[10px] text-white font-black tracking-widest uppercase">Integrated_Component_List</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900 shadow-2xl">
              {HYBRID_SPECS.map((spec) => (
                <div 
                  key={spec.name}
                  className="bg-black p-4 flex flex-col gap-2 hover:bg-zinc-950 transition-colors group cursor-crosshair"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-zinc-600 text-[8px] font-black tracking-tighter">[{spec.cat}]</span>
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${
                      spec.level === 'REDLINE' ? 'bg-red-600/10 text-red-600' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {spec.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-white font-black tracking-tight group-hover:text-red-600 transition-colors">
                    {spec.name}
                  </p>
                  <div className="w-full h-0.5 bg-zinc-900 overflow-hidden">
                    <div 
                      className={`h-full ${spec.level === 'REDLINE' ? 'bg-red-600' : 'bg-zinc-600'}`}
                      style={{ width: spec.level === 'REDLINE' ? '95%' : spec.level === 'TUNED' ? '80%' : '60%' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Hardware Telemetry Footer */}
            <div className="mt-auto grid grid-cols-3 gap-4 pt-8 border-t border-zinc-900">
              <div>
                <p className="text-zinc-600 text-[8px] uppercase mb-1">Target_Device</p>
                <p className="text-white text-[9px] font-black tracking-tighter">ACER_ASPIRE_7</p>
              </div>
              <div>
                <p className="text-zinc-600 text-[8px] uppercase mb-1">GPU_Acceleration</p>
                <p className="text-white text-[9px] font-black tracking-tighter text-red-600">RTX_3050_ACTIVE</p>
              </div>
              <div>
                <p className="text-zinc-600 text-[8px] uppercase mb-1">Architecture</p>
                <p className="text-white text-[9px] font-black tracking-tighter">NEXT_JS_15</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
