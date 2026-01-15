"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SkillGauge from "./SkillGauge";

const skillData = {
  data_eng: {
    title: "DATA_ENGINEERING",
    foundation: "NCE201 // FLUID MECH",
    skills: [
      { name: "KAFKA", val: 85, tier: "STAGE 3 TUNED" },
      { name: "SPARK", val: 70, tier: "FACTORY PLUS" },
      { name: "POSTGIS", val: 90, tier: "REDLINED" },
    ]
  },
  ai_ml: {
    title: "AI_INTELLIGENCE",
    foundation: "NCE204 // SA-I",
    skills: [
      { name: "YOLOV8", val: 95, tier: "REDLINED" },
      { name: "PYTORCH", val: 65, tier: "TUNING..." },
      { name: "RAG", val: 80, tier: "STAGE 2 TUNED" },
    ]
  },
  algorithms: {
    title: "COMPUTATIONAL_LOGIC",
    foundation: "NCE207 // GEOTECH-I",
    skills: [
      { name: "DP", val: 88, tier: "OPTIMIZED" },
      { name: "GRAPHS", val: 75, tier: "STAGE 1 TUNED" },
      { name: "DSA", val: 92, tier: "REDLINED" },
    ]
  }
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState<keyof typeof skillData>("data_eng");

  return (
    <section className="min-h-screen bg-zinc-950 py-20 px-10 font-mono">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-red-600 text-xs tracking-[0.5em] mb-12 uppercase">Module_04 // Performance_Specs</h2>
        
        <div className="flex flex-col md:flex-row gap-4 'h-[500px]'">
          {(Object.keys(skillData) as Array<keyof typeof skillData>).map((key) => (
            <motion.div 
              key={key}
              onClick={() => setActiveTab(key)}
              animate={{ flex: activeTab === key ? 3 : 1 }}
              className={`relative overflow-hidden border p-8 cursor-pointer transition-colors duration-500 ${
                activeTab === key ? 'border-red-600 bg-zinc-900' : 'border-zinc-800 bg-black hover:border-zinc-600'
              }`}
            >
              <div className="flex justify-between items-start">
                <h3 className={`text-xl font-black rotate-0 md:-rotate-90 md:origin-top-left whitespace-nowrap transition-colors ${
                  activeTab === key ? 'text-white' : 'text-zinc-700'
                }`}>
                  {skillData[key].title}
                </h3>
                
                {activeTab === key && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="flex flex-wrap justify-around w-full mt-10 md:mt-0"
                  >
                    {skillData[key].skills.map((s) => (
                      <SkillGauge key={s.name} label={s.name} value={s.val} tier={s.tier} />
                    ))}
                    
                    {/* Syllabus Redirect Placeholder */}
                    <div className="w-full mt-10 pt-10 border-t border-zinc-800">
                      <p className="text-[10px] text-zinc-500 mb-2 uppercase">Mechanical Foundation:</p>
                      <button className="text-xs text-red-600 font-bold hover:underline">
                        {skillData[key].foundation} // VIEW_SYLLABUS →
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
