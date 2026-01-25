"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

interface ScrollProviderProps {
  children: ReactNode;
}

export default function ScrollProvider({ children }: ScrollProviderProps) {
  return (
    <ReactLenis 
      root 
      options={{ 
        // LERP: Lowering this from 0.05 to 0.03 makes the scroll "heavier" and slower to catch up
        lerp: 0.035,        
        
        // DURATION: Increased to 1.8s for a more cinematic transition
        duration: 1.8,     
        
        smoothWheel: true,
        
        // WHEEL MULTIPLIER: Lowered to 0.6 to reduce the distance covered per scroll click
        wheelMultiplier: 0.6, 
        
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      {/* 
          TYPE_FIX: Bypassing React 19 / Lenis type conflict 
          Optimized for Acer Aspire 7 (RTX 3050) high-refresh display
      */}
      {children as any}
    </ReactLenis>
  );
}
