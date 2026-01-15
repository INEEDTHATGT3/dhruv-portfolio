"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [rpm, setRpm] = useState(0);
  const [status, setStatus] = useState("SYSTEM CHECK");
  const [isFinished, setIsFinished] = useState(false);

  // Status messages for the "Diagnostic" feel
  const diagnosticSteps = [
    { threshold: 1000, text: "INITIALIZING CHASSIS..." },
    { threshold: 3000, text: "CHECKING TELEMETRY (10Hz)..." },
    { threshold: 5000, text: "LOADING 3D MODELS (SOLIDWORKS)..." },
    { threshold: 7000, text: "INJECTING DATA SCIENCE CORE..." },
    { threshold: 7800, text: "READY FOR IGNITION" },
  ];

  useEffect(() => {
    // Simulated data-dependent increment 
    // (We will link this to actual Three.js progress in Module D)
    const interval = setInterval(() => {
      setRpm((prev) => {
        if (prev >= 8000) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onLoadingComplete, 1000);
          }, 500);
          return 8000;
        }
        // Random "Performance" jitter to look like a real engine
        const increment = Math.floor(Math.random() * 150) + 50;
        const nextRpm = prev + increment;
        
        const currentStep = diagnosticSteps.findLast(step => nextRpm >= step.threshold);
        if (currentStep) setStatus(currentStep.text);
        
        return nextRpm > 8000 ? 8000 : nextRpm;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 'z-[999]' bg-black flex flex-col items-center justify-center font-mono text-white"
        >
          {/* Dashboard Grid Background Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] 'bg-[size:40px_40px]'"></div>

          <div className="relative flex flex-col items-center">
            {/* Blinking Ignition Text */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-red-600 text-xs tracking-[0.3em] mb-4"
            >
              IGNITION SEQUENCE
            </motion.span>

            {/* RPM Counter */}
            <div className="flex flex-col items-center">
              <span className="text-8xl font-black tabular-nums tracking-tighter">
                {rpm}
              </span>
              <span className="text-xl text-zinc-500 -mt-2">RPM</span>
            </div>

            {/* Progress Bar (Tachometer Style) */}
            <div className="w-64 h-1 bg-zinc-800 mt-8 relative overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-red-600"
                style={{ width: `${(rpm / 8000) * 100}%` }}
              />
            </div>

            {/* Diagnostic Status */}
            <motion.div 
              key={status}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-[10px] text-zinc-400 uppercase tracking-widest"
            >
              {status}
            </motion.div>
          </div>

          {/* User Branding Footer */}
          <div className="absolute bottom-10 flex flex-col items-center gap-1 opacity-40">
          <span className="text-[10px] tracking-widest uppercase">Sambhav Jaiswal</span>
          <span className="text-[8px] tracking-widest opacity-60 uppercase font-bold">Data Scientist // AI Specialist</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
