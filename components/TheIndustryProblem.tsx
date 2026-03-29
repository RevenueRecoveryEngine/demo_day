"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  LayoutDashboard,
  Sparkles,
  X,
  Search,
  AlertCircle,
  PenTool,
} from "lucide-react";

export function TheIndustryProblem({ step }: { step: number }) {
  // Step 0: "Not an edge case" text
  // Step 1: 15-20% Metric
  // Step 2: "Everyone knows" text
  // Step 3: Fast pop - Dashboard
  // Step 4: Fast pop - Graph
  // Step 5: Fast pop - AI insight
  // Step 6: The Red X slam
  // Step 7: RRE Reveal

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#030712] text-white relative p-12 overflow-hidden">
      {/* ================= STEP 0: NOT AN EDGE CASE ================= */}
      <motion.div
        animate={{
          opacity: step === 0 ? 1 : 0,
          scale: step === 0 ? 1 : 1.05,
          zIndex: step === 0 ? 10 : 0,
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center"
      >
        <h2 className="text-5xl font-medium text-white/50 mb-4">
          This is not an edge case.
        </h2>
        <h2 className="text-6xl font-black text-white uppercase tracking-tight">
          This is the industry.
        </h2>
      </motion.div>

      {/* ================= STEP 1: THE METRIC ================= */}
      <motion.div
        animate={{
          opacity: step === 1 ? 1 : 0,
          scale: step === 1 ? 1 : 1.1,
          y: step > 1 ? -50 : 0,
          zIndex: step === 1 ? 10 : 0,
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center"
      >
        <div className="text-rose-500 font-mono text-2xl font-bold tracking-widest uppercase mb-4">
          Industry Average Return Rate
        </div>
        <div className="text-[150px] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-rose-400 to-rose-900 drop-shadow-[0_0_50px_rgba(225,29,72,0.3)]">
          15-20%
        </div>
        <div className="text-white/40 text-2xl font-medium mt-6">
          And people call that normal.
        </div>
      </motion.div>

      {/* ================= STEP 2: THE EMBARRASSING TRUTH ================= */}
      <motion.div
        animate={{
          opacity: step === 2 ? 1 : 0,
          scale: step === 2 ? 1 : 1.05,
          zIndex: step === 2 ? 10 : 0,
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-12"
      >
        <h2 className="text-4xl font-medium text-white/50 mb-6">
          And here’s the part that’s actually embarrassing:
          <br />
          <span className="text-white">
            Everyone knows this problem exists.
          </span>
        </h2>
        <h2 className="text-3xl font-mono text-violet-400 mt-8 uppercase tracking-widest">
          And still… the solution is always the same:
        </h2>
      </motion.div>

      {/* ================= STEPS 3 to 6: RAPID FIRE UI + RED X ================= */}
      <motion.div
        animate={{
          opacity: step >= 3 && step <= 6 ? 1 : 0,
          scale: step === 6 ? 0.95 : 1, // Slight shrink when the X hits
          zIndex: step >= 3 && step <= 6 ? 10 : 0,
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="flex gap-6 relative">
          {/* Dashboard Pop (Step 3) */}
          <motion.div
            animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 20 }}
            transition={{ duration: 0.15 }} // Very fast
            className="w-64 h-80 bg-[#0f111a] border border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 shadow-2xl"
          >
            <LayoutDashboard className="w-16 h-16 text-blue-500/50 mb-6" />
            <div className="text-xl font-bold text-white text-center">
              Another
              <br />
              dashboard.
            </div>
          </motion.div>

          {/* Graph Pop (Step 4) */}
          <motion.div
            animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 20 }}
            transition={{ duration: 0.15 }} // Very fast
            className="w-64 h-80 bg-[#0f111a] border border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 shadow-2xl"
          >
            <BarChart3 className="w-16 h-16 text-emerald-500/50 mb-6" />
            <div className="text-xl font-bold text-white text-center">
              Another
              <br />
              graph.
            </div>
          </motion.div>

          {/* AI Insight Pop (Step 5) */}
          <motion.div
            animate={{ opacity: step >= 5 ? 1 : 0, y: step >= 5 ? 0 : 20 }}
            transition={{ duration: 0.15 }} // Very fast
            className="w-64 h-80 bg-[#0f111a] border border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 shadow-2xl"
          >
            <Sparkles className="w-16 h-16 text-violet-500/50 mb-6" />
            <div className="text-xl font-bold text-white text-center text-balance">
              Another "AI insight" telling you what you know.
            </div>
          </motion.div>

          {/* The RED X (Step 6) */}
          <motion.div
            initial={{ scale: 3, opacity: 0 }}
            animate={{
              scale: step === 6 ? 1 : step > 6 ? 0.8 : 3,
              opacity: step === 6 ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }} // Aggressive slam
            className="absolute inset-0 flex items-center justify-center z-50"
          >
            <div className="relative flex items-center justify-center">
              <X
                className="w-96 h-96 text-rose-600 absolute drop-shadow-[0_0_50px_rgba(225,29,72,1)]"
                strokeWidth={3}
              />
              <div className="bg-black text-rose-500 px-10 py-4 text-4xl font-black uppercase tracking-widest border-4 border-rose-600 rotate-[-12deg] shadow-2xl z-10 whitespace-nowrap">
                Doesn't Fix Anything
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ================= STEP 7: THE RRE REVEAL ================= */}
      <motion.div
        animate={{
          opacity: step >= 7 ? 1 : 0,
          scale: step >= 7 ? 1 : 0.9,
          zIndex: step >= 7 ? 50 : 0,
        }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 flex flex-col items-center justify-center bg-[#030712]" // Solid bg to hide previous layers
      >
        <div className="absolute w-[800px] h-[800px] bg-violet-600/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="text-violet-400 font-mono text-xl tracking-widest uppercase mb-4">
          So we did something different
        </div>
        <h2 className="text-6xl font-black tracking-tighter mb-16 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50">
          Revenue Recovery Engine
        </h2>

        <div className="flex gap-8 max-w-5xl w-full px-8">
          {[
            {
              icon: Search,
              title: "Where it's wrong",
              desc: "Pinpoint exact listing flaws",
            },
            {
              icon: AlertCircle,
              title: "Why it fails",
              desc: "Map to customer expectations",
            },
            {
              icon: PenTool,
              title: "What to change",
              desc: "Surgical edits with evidence",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: step >= 7 ? 1 : 0, y: step >= 7 ? 0 : 20 }}
              transition={{ delay: i * 0.15 }}
              className="flex-1 bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mb-6 border border-violet-500/30">
                <item.icon className="w-8 h-8 text-violet-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-white/50">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
