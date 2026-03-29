"use client";

import { motion } from "framer-motion";

export function TheHardTruths({ step }: { step: number }) {
  // Step 0: "Here's what we learned..."
  // Step 1: Data Pipeline
  // Step 2: Scraping
  // Step 3: Output

  return (
    <div className="flex flex-col justify-center w-full h-full bg-[#030712] text-white relative p-24 overflow-hidden max-w-6xl mx-auto">
      <motion.h2
        animate={{ opacity: step >= 0 ? 1 : 0, y: step >= 0 ? 0 : 20 }}
        className="text-3xl font-mono text-violet-400 mb-16 uppercase tracking-widest"
      >
        Here's what we learned building it:
      </motion.h2>

      <div className="space-y-12">
        <motion.div
          animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : -50 }}
          className="text-5xl font-medium leading-tight text-white/50"
        >
          If your data pipeline is weak,{" "}
          <span className="text-white font-black">your AI is useless.</span>
        </motion.div>

        <motion.div
          animate={{ opacity: step >= 2 ? 1 : 0, x: step >= 2 ? 0 : -50 }}
          className="text-5xl font-medium leading-tight text-white/50"
        >
          If your scraping breaks,{" "}
          <span className="text-white font-black">your system lies.</span>
        </motion.div>

        <motion.div
          animate={{ opacity: step >= 3 ? 1 : 0, x: step >= 3 ? 0 : -50 }}
          className="text-5xl font-medium leading-tight text-white/50"
        >
          If your output isn't defensible, it's just{" "}
          <span className="text-rose-400 font-black">
            guesswork with better branding.
          </span>
        </motion.div>
      </div>
    </div>
  );
}
