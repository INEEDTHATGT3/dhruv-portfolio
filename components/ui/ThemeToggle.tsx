"use client";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle({ isDark, toggle }: { isDark: boolean; toggle: () => void }) {
  return (
    <button 
      onClick={toggle}
      className="bg-zinc-900/50 dark:bg-white/10 backdrop-blur-md border border-white/10 p-2 rounded-full hover:border-red-600 transition-all group"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        className="text-zinc-500 group-hover:text-red-600"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.div>
    </button>
  );
}
