"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Code2, Network, ArrowRight } from "lucide-react";

export function StoryLlmExtraction({ step }: { step: number }) {
  // Step 0: Asking what it can do (LLM handles everything)
  // Step 1: Focus on where it fails (LLM throws error on exact logic)
  // Step 2: Remove it (TS Gate replaces it)

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#030712] text-white relative p-12 overflow-hidden">
      <div className="flex items-center justify-center gap-8 w-full max-w-6xl">
        {/* Left Side: Complex Input */}
        <div className="flex flex-col gap-4">
          <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl font-mono text-sm text-white/60 flex items-center gap-3">
            <Network className="w-5 h-5 text-blue-400" />
            Unstructured Data
          </div>
          <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl font-mono text-sm text-white/60 flex items-center gap-3">
            <Network className="w-5 h-5 text-blue-400" />
            Vague Product Title
          </div>
        </div>

        <ArrowRight className="w-8 h-8 text-white/20" />

        {/* The Central Processing Area */}
        <div className="relative w-80 h-96 flex flex-col items-center justify-center">
          {/* THE LLM NODE */}
          <motion.div
            animate={{
              y: step >= 2 ? 250 : 0, // Drops out of the flow on step 2
              opacity: step >= 2 ? 0.2 : 1,
              borderColor:
                step === 1
                  ? "rgba(225, 29, 72, 0.8)"
                  : "rgba(139, 92, 246, 0.5)",
              boxShadow:
                step === 1
                  ? "0 0 60px rgba(225, 29, 72, 0.3)"
                  : "0 0 0px transparent",
            }}
            transition={{ duration: 0.6, ease: "anticipate" }}
            className="w-full bg-[#0f111a] border-2 rounded-2xl p-6 flex flex-col items-center relative z-20"
          >
            <BrainCircuit
              className={`w-16 h-16 mb-4 ${step === 1 ? "text-rose-500" : "text-violet-500"}`}
            />
            <h3 className="font-black tracking-widest uppercase mb-4 text-lg">
              Omni-Model
            </h3>

            {/* The Internal Tasks of the LLM */}
            <div className="w-full space-y-2">
              <div className="bg-white/5 rounded px-3 py-2 font-mono text-xs text-white/50 text-center">
                Parse Entities
              </div>
              <div className="bg-white/5 rounded px-3 py-2 font-mono text-xs text-white/50 text-center">
                Analyze Sentiment
              </div>

              {/* The Failing Task */}
              <motion.div
                animate={{
                  backgroundColor:
                    step === 1
                      ? "rgba(225, 29, 72, 0.2)"
                      : "rgba(255, 255, 255, 0.05)",
                  color: step === 1 ? "#fda4af" : "rgba(255, 255, 255, 0.5)",
                  borderColor:
                    step === 1 ? "rgba(225, 29, 72, 0.5)" : "transparent",
                }}
                className="rounded px-3 py-2 font-mono text-xs text-center border"
              >
                Validate Exact Fitment
              </motion.div>
            </div>
          </motion.div>

          {/* THE DETERMINISTIC CODE GATE (Replaces the LLM) */}
          <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{
              y: step >= 2 ? 0 : -200,
              opacity: step >= 2 ? 1 : 0,
            }}
            transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
            className="absolute inset-0 z-30 flex items-center justify-center"
          >
            <div className="w-full bg-blue-950/80 border-2 border-blue-500 backdrop-blur-xl rounded-2xl p-8 flex flex-col items-center shadow-[0_0_80px_rgba(59,130,246,0.2)]">
              <Code2 className="w-16 h-16 text-blue-400 mb-6" />
              <h3 className="font-black tracking-widest uppercase text-blue-100 mb-4 text-xl">
                Deterministic Gate
              </h3>
              <div className="w-full bg-black/50 border border-blue-500/30 rounded-lg p-4 font-mono text-sm text-blue-300">
                <span className="text-blue-500">if</span> (!payload.fitment){" "}
                {"{"}
                <br />
                &nbsp;&nbsp;<span className="text-blue-500">return</span>{" "}
                BLOCK_ACTION;
                <br />
                {"}"}
              </div>
            </div>
          </motion.div>
        </div>

        <ArrowRight className="w-8 h-8 text-white/20" />

        {/* Right Side: Execution */}
        <div className="px-6 py-8 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center min-w-[160px]">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mb-3">
            <div className="w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,1)]" />
          </div>
          <span className="font-mono text-sm text-white/60 uppercase tracking-widest">
            Execute
          </span>
        </div>
      </div>
    </div>
  );
}
