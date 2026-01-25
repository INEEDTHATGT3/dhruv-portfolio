"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import { Send, CheckCircle2, Instagram, Linkedin, Github, AlertCircle, ChevronRight } from "lucide-react";

export default function Terminal() {
  const form = useRef<HTMLFormElement>(null);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);

    const SERVICE_ID = 'service_zqw003r';
    const PUBLIC_KEY = 'IbW544wxBIzxm1tbg';
    const TEMPLATE_ID = 'template_h4tsst4'; 

    // Logic to ensure email is sent as lowercase regardless of input display
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current!, PUBLIC_KEY)
      .then(() => {
        setStatus('success');
        setIsTransmitting(false);
      }, (error) => {
        console.error('Handshake_Failed:', error.text);
        setStatus('error');
        setIsTransmitting(false);
      });
  };

  const socialLinks = [
    { name: "INSTAGRAM", icon: Instagram, href: "https://instagram.com/NEED_A_6_BANGER", label: "@NEED_A_6_BANGER" },
    { name: "LINKEDIN", icon: Linkedin, href: "https://www.linkedin.com/in/sambhav-jaiswal", label: "Sambhav jaiswal" },
    { name: "GITHUB", icon: Github, href: "https://github.com/INEEDTHATGT3", label: "INEEDTHATGT3" }
  ];

  return (
    <section id="terminal" className="min-h-screen bg-black py-32 px-6 font-mono flex items-center justify-center text-white">
      <div className="max-w-2xl w-full border border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="bg-zinc-900 p-4 border-b border-zinc-800 flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          </div>
          <span className="text-[10px] text-zinc-500 font-black tracking-widest uppercase">Comms_Terminal // V.04</span>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 border border-zinc-900 bg-black hover:border-red-600 transition-all group">
                <link.icon size={14} className="text-zinc-600 group-hover:text-red-600" />
                <div className="flex flex-col">
                  <span className="text-[7px] text-zinc-500 font-black uppercase">{link.name}</span>
                  <span className="text-[9px] text-white truncate">{link.label}</span>
                </div>
              </a>
            ))}
          </div>

          {status === 'idle' ? (
            <form ref={form} onSubmit={sendEmail} className="space-y-8">
              <div className="flex items-center gap-2 text-zinc-500 text-xs italic">
                <ChevronRight size={14} />
                <span>Initializing secure transmission...</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-red-600 text-[8px] font-black mb-1 tracking-widest uppercase">Input_Name</p>
                  <input required name="user_name" className="bg-transparent border-b border-zinc-900 focus:border-red-600 outline-none text-white text-xs w-full py-2 transition-colors uppercase" placeholder="_" />
                </div>
                
                <div>
                  <p className="text-red-600 text-[8px] font-black mb-1 tracking-widest uppercase">Input_Email</p>
                  {/* Note: 'lowercase' class is for visual; browser handles the string casing */}
                  <input required name="user_email" type="email" className="bg-transparent border-b border-zinc-900 focus:border-red-600 outline-none text-white text-xs w-full py-2 transition-colors lowercase" placeholder="user@email.com" />
                </div>

                <div>
                  <p className="text-red-600 text-[8px] font-black mb-1 tracking-widest uppercase">Input_Message</p>
                  <textarea required name="message" rows={3} className="bg-zinc-900/50 p-4 border border-zinc-800 focus:border-red-600 outline-none text-white text-xs w-full resize-none transition-colors" placeholder="TYPE_TRANSMISSION_HERE..." />
                </div>
              </div>

              <button disabled={isTransmitting} className="w-full py-4 bg-red-600 hover:bg-white text-white hover:text-black transition-all font-black text-[10px] tracking-[0.4em] uppercase disabled:opacity-50">
                {isTransmitting ? "ENCRYPTING_PACKETS..." : "EXECUTE_TRANSMISSION"}
              </button>
            </form>
          ) : status === 'success' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 text-center">
              <CheckCircle2 size={40} className="text-green-500 mx-auto mb-4" />
              <p className="text-white text-xs font-black tracking-widest uppercase">Data_Transmitted_Successfully</p>
              <button onClick={() => setStatus('idle')} className="text-red-600 text-[9px] mt-8 hover:underline font-black uppercase tracking-widest">
                {'>'} Initialize_New_Session
              </button>
            </motion.div>
          ) : (
            <div className="py-10 text-center text-red-600 border border-red-600/20 bg-red-600/5 px-4">
              <AlertCircle size={40} className="mx-auto mb-4" />
              <p className="text-xs font-black uppercase tracking-widest">Transmission_Interrupted</p>
              <p className="text-zinc-600 text-[9px] mt-2 tracking-widest uppercase italic">Check "To Email" in Dashboard settings.</p>
              <button onClick={() => setStatus('idle')} className="text-white text-[9px] mt-8 hover:underline uppercase font-black tracking-widest">
                {'>'} Retry_Handshake
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
