"use client";

import { motion } from "framer-motion";
import { Database } from "lucide-react";

export function SystemArchitecture({ step }: { step: number }) {
  // Step 0: "Instead of another polished demo..."
  // Step 1: Shows photo
  // Step 2: "Starting with scraping" focus

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#030712] text-white relative p-12 overflow-hidden">
      <motion.div
        animate={{
          opacity: step === 0 ? 1 : 0,
          scale: step === 0 ? 1 : 0.9,
          zIndex: step === 0 ? 10 : 0,
        }}
        className="absolute inset-0 flex items-center justify-center text-center px-24 pointer-events-none"
      >
        <h2 className="text-6xl font-black text-white leading-tight">
          So instead of showing you another polished demo…
        </h2>
      </motion.div>

      <motion.div
        animate={{
          opacity: step >= 1 ? 1 : 0,
          scale: step >= 1 ? 1 : 0.95,
          zIndex: step >= 1 ? 20 : 0,
        }}
        className="w-full max-w-6xl flex flex-col items-center relative"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-mono text-violet-400 uppercase tracking-widest">
            How to actually build this properly
          </h3>
        </div>

        {/* The Sleek Photo Container */}
        <div className="w-full bg-[#0f111a] border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.15)] relative">
          <img
            src="/architecture.png"
            alt="System Architecture"
            className="w-full h-auto object-contain max-h-[60vh] opacity-90"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none" />
        </div>

        {/* Step 2 focus banner */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: step >= 2 ? 0 : 50, opacity: step >= 2 ? 1 : 0 }}
          className="absolute -bottom-16 bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-3xl uppercase tracking-widest shadow-[0_0_40px_rgba(37,99,235,0.6)] flex items-center gap-4"
        >
          <Database className="w-8 h-8" />
          Starting with Scraping
        </motion.div>
      </motion.div>
    </div>
  );
}
