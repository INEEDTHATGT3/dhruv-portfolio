"use client";
import { useState, useEffect } from 'react';

export const useHardwareDetection = () => {
  const [isHighPerf, setIsHighPerf] = useState(true);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext;
    
    if (!gl) {
      setIsHighPerf(false);
      return;
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "";

    // Logic for your specific hardware: RTX 3050 vs Radeon 530
    if (isMobile || renderer.includes("Radeon 530") || renderer.includes("Intel HD")) {
      setIsHighPerf(false);
    } else if (renderer.includes("RTX") || renderer.includes("NVIDIA")) {
      setIsHighPerf(true);
    }
  }, []);

  return [isHighPerf, setIsHighPerf] as const;
};
