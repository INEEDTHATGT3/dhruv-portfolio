"use client";
import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

interface ScrollProviderProps {
  children: ReactNode;
}

export default function ScrollProvider({ children }: ScrollProviderProps) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.035,        // Cinematic slow scroll
        duration: 1.8,     
        smoothWheel: true,
        wheelMultiplier: 0.6, 
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      {/* TYPE_FIX: Bypassing React 19 / Lenis type conflict */}
      {children as any}
    </ReactLenis>
  );
}
