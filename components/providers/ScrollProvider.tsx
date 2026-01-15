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
        lerp: 0.05,        // Cinematic slow scroll
        duration: 1.5,     
        smoothWheel: true,
        wheelMultiplier: 0.8, 
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {/* 
          TYPE_FIX: We cast 'children' to 'any' here because the Lenis library 
          is expecting React 18 types, but your project is using React 19. 
          This prevents the 'bigint' assignment error.
      */}
      {children as any}
    </ReactLenis>
  );
}

