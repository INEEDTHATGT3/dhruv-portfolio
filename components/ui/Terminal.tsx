"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Terminal() {
  const [input, setInput] = useState("");
  
  return (
    <section className="bg-black py-20 px-10 font-mono">
      <div className="max-w-4xl mx-auto border border-zinc-800 rounded-lg overflow-hidden shadow-2xl shadow-red-900/10">
        {/* Terminal Header */}
        <div className="bg-zinc-900 px-4 py-2 flex items-center gap-2 border-b border-zinc-800">
          <div className="w-2 h-2 rounded-full bg-red-600" />
          <div className="w-2 h-2 rounded-full bg-zinc-700" />
          <div className="w-2 h-2 rounded-full bg-zinc-700" />
          <span className="ml-4 text-[10px] text-zinc-500 uppercase tracking-widest font-bold">dhruv_jaiswal@terminal</span>
        </div>

        {/* Terminal Body */}
        <div className="p-8 text-sm space-y-4 min-h-[400px]">
          <p className="text-zinc-500 italic"># Initializing secure connection to Data Scientist core...</p>
          <p className="text-green-500 font-bold">Connection established.</p>
          <p className="text-white">Available commands: <span className="text-red-600">--send-message</span>, <span className="text-red-600">--github</span>, <span className="text-red-600">--linkedin</span></p>
          
          <div className="pt-10 flex flex-col gap-6">
            <div className="flex gap-4">
              <span className="text-red-600 font-black tracking-tighter uppercase shrink-0">Name:</span>
              <input type="text" className="bg-transparent border-none outline-none text-white w-full border-b border-zinc-900 focus:border-red-600 transition-colors" placeholder="_" />
            </div>
            <div className="flex gap-4">
              <span className="text-red-600 font-black tracking-tighter uppercase shrink-0">Email:</span>
              <input type="email" className="bg-transparent border-none outline-none text-white w-full border-b border-zinc-900 focus:border-red-600 transition-colors" placeholder="_" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-red-600 font-black tracking-tighter uppercase">Message:</span>
              <textarea rows={4} className="bg-zinc-900/50 p-4 border border-zinc-800 outline-none text-white w-full focus:border-red-600 transition-colors resize-none" placeholder="Type your transmission here..." />
            </div>
            <button className="w-full py-4 bg-red-600 text-white font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">
              Transmit_Data // Start_Ignition
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
