"use client";

import { motion } from "framer-motion";

export function TitleSlide() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#030712] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10"
      >
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 text-violet-400 font-mono text-sm tracking-widest uppercase">
          Demo Day • Team 6
        </div>

        <h1 className="text-8xl md:text-[120px] font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40">
          RRE
        </h1>

        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white/70 mb-8">
          Revenue Recovery Engine
        </h2>

        <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-blue-600 mx-auto rounded-full" />
      </motion.div>
    </div>
  );
}
