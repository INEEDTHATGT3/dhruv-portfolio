"use client";

import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";

export default function TurboIcon() {
  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  
  // Choice Q3-B: Base rotation + Velocity-based acceleration
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityRotation = useTransform(smoothVelocity, [-1, 1], [-360, 360]);
  const baseRotation = useTransform(scrollYProgress, [0, 1], [0, 720]);

  return (
    <motion.svg
      width="40"
      height="40"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ rotate: velocityRotation }} // Spins faster when you scroll fast
      className="text-red-600"
    >
      {/* Outer Housing */}
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" className="opacity-20" />
      {/* Turbine Blades */}
      <motion.g style={{ rotate: baseRotation }}>
        <path d="M50 10 L55 40 L45 40 Z" fill="currentColor" />
        <path d="M90 50 L60 55 L60 45 Z" fill="currentColor" />
        <path d="M50 90 L45 60 L55 60 Z" fill="currentColor" />
        <path d="M10 50 L40 45 L40 55 Z" fill="currentColor" />
        <path d="M78 22 L55 45 L65 35 Z" fill="currentColor" />
        <path d="M22 78 L45 55 L35 65 Z" fill="currentColor" />
        <path d="M78 78 L55 55 L65 65 Z" fill="currentColor" />
        <path d="M22 22 L45 45 L35 35 Z" fill="currentColor" />
      </motion.g>
      <circle cx="50" cy="50" r="8" fill="black" stroke="currentColor" strokeWidth="2" />
    </motion.svg>
  );
}
