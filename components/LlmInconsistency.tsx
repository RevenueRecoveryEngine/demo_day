"use client";

import { motion } from "framer-motion";
import {
  Database,
  BrainCircuit,
  LayoutTemplate,
  AlertTriangle,
  FileJson,
} from "lucide-react";

export function LlmInconsistency({ step }: { step: number }) {
  // Step 0: Data comes in
  // Step 1: Reliable decision (Clean JSON)
  // Step 2: Unreliable decision (Corrupted Output)
  // Step 3: Doesn't wait (moves to CMS)
  // Step 4: Business decision applied

  const llmColorClass = step >= 2 ? "text-rose-500" : "text-violet-500";
  const textStrikeClass =
    step >= 4 ? "text-white/20 line-through" : "text-white/80";

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#030712] text-white relative overflow-hidden">
      {/* THE AI PIPELINE */}
      <motion.div
        animate={{ y: step >= 4 ? -180 : -50, scale: step >= 4 ? 0.85 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="flex items-center justify-center gap-8 w-full max-w-6xl z-20"
      >
        {/* Input Data */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative shadow-lg">
            <Database className="w-10 h-10 text-white/50" />
            <motion.div
              animate={{
                x: step === 0 ? [0, 150] : step === 2 ? [0, 150] : 0,
                opacity: step === 0 || step === 2 ? [0, 1, 0] : 0,
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1)] z-50"
            />
          </div>
          <span className="mt-4 font-mono text-white/40 uppercase tracking-widest text-sm">
            Raw Input
          </span>
        </div>

        <div className="w-24 h-1 bg-white/10" />

        {/* The LLM */}
        <div className="flex flex-col items-center">
          <motion.div
            animate={{
              borderColor:
                step >= 2
                  ? "rgba(225, 29, 72, 0.5)"
                  : "rgba(139, 92, 246, 0.5)",
              boxShadow:
                step >= 2
                  ? "0 0 60px rgba(225, 29, 72, 0.2)"
                  : "0 0 60px rgba(139, 92, 246, 0.2)",
            }}
            className="w-40 h-40 rounded-[2rem] bg-[#0f111a] border-2 flex items-center justify-center transition-colors duration-500 relative"
          >
            <BrainCircuit
              className={`w-20 h-20 transition-colors duration-500 ${llmColorClass}`}
            />
          </motion.div>
          <span className="mt-4 font-mono text-white/40 uppercase tracking-widest text-sm">
            LLM Node
          </span>
        </div>

        <div className="w-24 h-1 bg-white/10 relative" />

        {/* The Output Area */}
        <div className="w-64 h-40 relative flex items-center justify-start">
          {/* Output 1: Reliable JSON */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: step === 1 ? 1 : 0, opacity: step === 1 ? 1 : 0 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="absolute w-64 bg-blue-950/30 border border-blue-500/50 rounded-xl p-4 shadow-[0_0_30px_rgba(59,130,246,0.3)] backdrop-blur-md"
          >
            <div className="flex items-center gap-2 mb-2 text-blue-400">
              <FileJson className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-widest">
                Valid_Schema
              </span>
            </div>
            <div className="font-mono text-sm text-blue-200">
              <span className="text-white/50">{"{"}</span>
              <br />
              <span>
                &nbsp;&nbsp;&quot;fitment&quot;: &quot;2018-2020&quot;
              </span>
              <br />
              <span className="text-white/50">{"}"}</span>
            </div>
          </motion.div>

          {/* Output 2: Unreliable Hallucination */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: step >= 2 ? 1 : 0,
              opacity: step >= 2 ? 1 : 0,
              y: step >= 4 ? 250 : 0, // Drops straight down into CMS
              x: step >= 4 ? -200 : 0, // Slides left to align with CMS
            }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
            className="absolute w-64 bg-rose-950/50 border border-rose-500/80 rounded-xl p-4 shadow-[0_0_40px_rgba(225,29,72,0.4)] backdrop-blur-md z-50"
          >
            <div className="flex items-center gap-2 mb-2 text-rose-400">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-widest">
                Hallucination
              </span>
            </div>
            <div className="font-mono text-sm text-rose-300 break-words">
              Sure! The part fits all trucks made after 1990.
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* THE CMS TERMINAL */}
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: step >= 3 ? 0 : 300, opacity: step >= 3 ? 1 : 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        className="absolute bottom-12 w-[800px] bg-[#0f111a] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-10"
      >
        <div className="bg-black/80 px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutTemplate className="w-4 h-4 text-white/30" />
            <div className="text-xs font-mono text-white/30 uppercase tracking-widest">
              Shopify Admin • Ford F-150 Brake Caliper
            </div>
          </div>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
          </div>
        </div>

        <div className="p-8">
          <div className="text-sm font-bold text-white/50 mb-2 uppercase tracking-wide">
            Product Description
          </div>
          <div className="w-full h-32 bg-black/60 border border-white/5 rounded-lg p-4 font-mono text-xl flex items-start relative overflow-hidden">
            {/* The original text gets crossed out on step 4 */}
            <span className={`transition-all duration-300 ${textStrikeClass}`}>
              High quality replacement part. Fits Ford F-150.
            </span>

            {/* The Bad Business Decision Lock-in */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: step >= 4 ? 1 : 0 }}
              transition={{ delay: 0.3 }}
              className="absolute inset-0 bg-rose-950/40 backdrop-blur-[2px] border-2 border-rose-500/50 flex items-center justify-center"
            >
              <div className="bg-rose-600 text-white px-6 py-2 rounded font-black uppercase tracking-widest shadow-xl flex items-center gap-3">
                <AlertTriangle className="w-6 h-6" />
                Live Business Decision Applied
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
