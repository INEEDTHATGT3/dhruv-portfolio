"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: { title: string; units: string[] };
}

export default function SyllabusModal({ isOpen, onClose, data }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl bg-zinc-900 border border-red-600 p-8 font-mono"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
              <X size={20} />
            </button>
            <h2 className="text-red-600 text-xs tracking-widest mb-2 uppercase font-black">Technical_Manual // HBTU_CIVIL</h2>
            <h3 className="text-2xl text-white font-black mb-8 border-b border-zinc-800 pb-4 italic">{data.title}</h3>
            
            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
              {data.units.map((unit, i) => (
                <div key={i} className="group">
                  <p className="text-red-600 text-[10px] mb-1 font-bold">UNIT_0{i+1}</p>
                  <p className="text-zinc-300 text-sm leading-relaxed group-hover:text-white transition-colors">{unit}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
