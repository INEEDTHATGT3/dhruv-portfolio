"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Automotive & UI Components
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

// Navigation Logic
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

  return (
    <main className="min-h-screen bg-black selection:bg-red-600 selection:text-white overflow-x-hidden">
      {isLoading ? (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <FEAHeatmap />
          
          {/* Unified Navigation Hub */}
          <div className="fixed top-8 right-8 'z-100' flex flex-col items-end gap-2">
            <div 
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="flex items-center bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-2xl cursor-pointer group hover:border-red-600 transition-all"
            >
              <div className="px-5 py-2 border-r border-white/10">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-black group-hover:text-red-600 transition-colors">
                  {isNavOpen ? "CLOSE_MENU" : "IGNITION_CONTROL"}
                </span>
              </div>
              <div className="px-4 py-2">
                <TurboIcon />
              </div>
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isNavOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="bg-zinc-950/95 border border-white/10 backdrop-blur-2xl p-6 rounded-2xl w-64 shadow-3xl"
                >
                  <div className="flex flex-col gap-4">
                    {NAV_LINKS.map((link) => (
                      <a 
                        key={link.name} 
                        href={link.href}
                        onClick={() => setIsNavOpen(false)}
                        className="font-mono text-[10px] text-zinc-500 hover:text-red-600 tracking-widest transition-colors flex items-center gap-3 group"
                      >
                        <span className="w-1 h-1 bg-zinc-800 group-hover:bg-red-600 transition-colors" />
                        {link.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sections with IDs for Navigation */}
          <section id="hero"><Hero /></section>
          <section id="bridge"><Bridge /></section>
          <section id="garage"><Garage /></section>
          <section id="workshop"><Workshop /></section>
          <section id="specs"><Skills /></section>
          <section id="resume"><Logbook /></section>
          <section id="terminal"><Terminal /></section>
        </>
      )}
    </main>
  );
}

