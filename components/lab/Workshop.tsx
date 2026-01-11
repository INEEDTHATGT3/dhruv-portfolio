"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls, 
  Stage, 
  PerspectiveCamera, 
  Float, 
  Html, 
  Loader 
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

// --- sub-component: The 3D Model Logic ---
function Model({ isWireframe, isMobile }: { isWireframe: boolean; isMobile: boolean }) {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh castShadow receiveShadow>
        {/* Placeholder Geometry: Swap with <primitive object={nodes.YourModel} /> after GLB load */}
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial 
          color={isWireframe ? "#ef4444" : "#18181b"} 
          wireframe={isWireframe}
          emissive={isWireframe ? "#ef4444" : "#000000"}
          emissiveIntensity={isWireframe ? 5 : 0}
          roughness={0.1}
          metalness={0.8}
        />
        
        {/* Choice Q2-B: Floating Data Bubbles (Hidden on mobile for performance) */}
        {!isWireframe && !isMobile && (
          <Html distanceFactor={8} position={[1.2, 1.2, 0]}>
            <div className="flex flex-col gap-2 w-48 pointer-events-none select-none">
              <div className="bg-black/80 border-l-2 border-red-600 p-3 backdrop-blur-md shadow-2xl">
                <p className="text-[8px] text-red-600 font-mono font-black uppercase tracking-widest mb-1">
                  FEA_STRESS_POINT_04
                </p>
                <p className="text-[10px] text-zinc-300 font-mono leading-tight">
                  TORSIONAL_LOAD: 850Nm<br/>
                  STATUS: OPTIMIZED
                </p>
              </div>
            </div>
          </Html>
        )}
      </mesh>
    </Float>
  );
}

// --- Main Component ---
export default function Workshop() {
  const [isWireframe, setIsWireframe] = useState(true);
  const [webGLError, setWebGLError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for device type and screen width
  useEffect(() => {
    const checkSpecs = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkSpecs();
    window.addEventListener("resize", checkSpecs);
    return () => window.removeEventListener("resize", checkSpecs);
  }, []);

  return (
    <section className="relative h-screen w-full bg-[#050505] overflow-hidden font-mono">
      
      {/* 1. HUD Overlay Controls */}
      <div className="absolute top-24 left-8 z-20 space-y-6">
        <div className="border-l-2 border-red-600 pl-5">
          <h2 className="text-white text-3xl font-black italic tracking-tighter">THE_WORKSHOP</h2>
          <p className="text-zinc-600 text-[9px] uppercase tracking-[0.3em] mt-1">
            SolidWorks // HBTU_CIVIL_ENGINEERING
          </p>
        </div>
        
        <button 
          onClick={() => setIsWireframe(!isWireframe)}
          className={`group relative px-6 py-3 text-[10px] font-black tracking-widest border transition-all duration-500 overflow-hidden ${
            isWireframe 
            ? 'bg-red-600 border-red-600 text-white' 
            : 'bg-transparent border-zinc-800 text-zinc-500 hover:border-red-600 hover:text-white'
          }`}
        >
          <span className="relative z-10">{isWireframe ? "SOLIDIFY_CHASSIS" : "ANALYZE_WIREFRAME"}</span>
          {isWireframe && (
            <motion.div 
              layoutId="btn-glow" 
              className="absolute inset-0 bg-white/20" 
              initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ repeat: Infinity, duration: 1.5 }}
            />
          )}
        </button>
      </div>

      {/* 2. Hardware Status HUD */}
      <div className="absolute bottom-10 left-8 z-10 opacity-30 pointer-events-none">
        <div className="flex flex-col gap-1 text-[8px] text-zinc-500 uppercase">
          <p className="flex items-center gap-2">
            <span className={`w-1 h-1 rounded-full ${webGLError ? 'bg-red-600' : 'bg-green-500 animate-pulse'}`} />
            GPU_ACCELERATION: {isMobile ? "MOBILE_OPTIMIZED" : "RTX_3050_ACTIVE"}
          </p>
          <p>RENDERING_CONTEXT: {webGLError ? "FALLBACK_2D" : "WEBGL_2.0"}</p>
        </div>
      </div>

      {/* 3. The 3D Canvas with Fallback Logic */}
      {webGLError ? (
        /* --- FALLBACK UI: For Lenovo / Context Blocked --- */
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="border border-zinc-900 bg-zinc-950/50 p-12 rounded-sm max-w-md mx-auto">
            <div className="w-12 h-12 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h3 className="text-red-600 text-sm font-black uppercase mb-2 italic">Context_Loss_Detected</h3>
            <p className="text-zinc-600 text-[10px] leading-relaxed uppercase">
              The browser has blocked WebGL. Refresh or check your RTX 3050 settings in Chrome Flags.
            </p>
          </div>
        </div>
      ) : (
        /* --- 3D VIEW: For Acer Aspire 7 / Mi 11X --- */
        <Canvas 
          shadows 
          dpr={isMobile ? [1, 1.2] : [1, 2]} // Lower resolution for Mi 11X
          gl={{ 
            antialias: false, 
            powerPreference: "high-performance",
            alpha: true 
          }}
          onCreated={({ gl }) => {
            gl.getContext().canvas.addEventListener('webglcontextlost', (e) => {
              e.preventDefault();
              setWebGLError(true);
            }, false);
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={isMobile ? 60 : 45} />
          
          <Suspense fallback={null}>
            <Stage 
              environment="night" 
              intensity={0.5} 
              shadows={isMobile ? false : { type: 'contact', opacity: 0.5, blur: 3 }}
              adjustCamera={false}
            >
              <Model isWireframe={isWireframe} isMobile={isMobile} />
            </Stage>
          </Suspense>

          <OrbitControls 
            enableZoom={false} 
            autoRotate={!isWireframe} 
            autoRotateSpeed={0.8}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 2.5}
          />
          
          {/* Choice Q3-B: Night Garage Lighting */}
          <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={2} color="#ef4444" castShadow />
          <pointLight position={[-5, -5, -5]} intensity={1} color="#3b82f6" />
        </Canvas>
      )}
      
      <Loader /> {/* Technical loading bar for the 3D assets */}
    </section>
  );
}
