"use client";

import { motion } from "framer-motion";

// Fixed coordinates for the visual nodes
const ALIGNED_POSITIONS = [
  { x: -160, y: 0 },
  { x: -80, y: 0 },
  { x: 0, y: 0 },
  { x: 80, y: 0 },
  { x: 160, y: 0 },
];

const DRIFT_POSITIONS = [
  { x: -220, y: -120 },
  { x: -90, y: 160 },
  { x: 50, y: -190 },
  { x: 130, y: 90 },
  { x: 240, y: -50 },
];

export function TheBlueprint({ step }: { step: number }) {
  // Step 0: Alignment (Nodes connected)
  // Step 1: Drift (Nodes scattered)
  // Step 2: Blueprint Image
  // Step 3: Scanner (Go back to it)
  // Step 4: Foundation (Lock in)

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#030712] text-white relative p-12 overflow-hidden">
      {/* ================= STEP 0 & 1: ALIGNMENT VS DRIFT ================= */}
      <motion.div
        animate={{ opacity: step < 2 ? 1 : 0, scale: step < 2 ? 1 : 0.8 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Connecting Line (Only visible when aligned) */}
          <motion.div
            animate={{
              opacity: step === 0 ? 1 : 0,
              width: step === 0 ? 320 : 0,
            }}
            className="absolute h-1 bg-white/20"
          />

          {/* Geometric Nodes */}
          {ALIGNED_POSITIONS.map((pos, i) => {
            const isDrift = step === 1;
            const targetPos = isDrift ? DRIFT_POSITIONS[i] : pos;

            return (
              <motion.div
                key={i}
                initial={pos}
                animate={{
                  x: targetPos.x,
                  y: targetPos.y,
                  backgroundColor: isDrift ? "#e11d48" : "#ffffff",
                  scale: isDrift ? 1.5 : 1,
                }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="absolute w-6 h-6 rounded-full -ml-3 -mt-3 shadow-lg"
              />
            );
          })}

          {/* Minimal Text Labels */}
          <motion.div
            animate={{ opacity: step === 0 ? 1 : 0, y: step === 0 ? -60 : -40 }}
            className="absolute text-2xl font-mono uppercase tracking-widest text-white/50"
          >
            Alignment
          </motion.div>

          <motion.div
            animate={{ opacity: step === 1 ? 1 : 0, y: step === 1 ? -60 : -40 }}
            className="absolute text-4xl font-black uppercase tracking-widest text-rose-500"
          >
            Drift
          </motion.div>
        </div>
      </motion.div>

      {/* ================= STEP 2-4: THE BLUEPRINT IMAGE ================= */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: step >= 2 ? 1 : 0,
          y: step >= 2 ? 0 : 100,
          scale: step === 4 ? 0.95 : 1, // Shrinks slightly to make room for the foundation
        }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="absolute z-20 flex flex-col items-center justify-center w-full"
      >
        {/* The Image Container (Styled like a sleek terminal/editor window) */}
        <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] bg-[#0f111a] p-1 max-w-4xl w-full">
          {/* Fake Window Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-black/40 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-white/20" />
            <div className="w-3 h-3 rounded-full bg-white/20" />
            <div className="w-3 h-3 rounded-full bg-white/20" />
            <div className="ml-4 text-xs font-mono text-white/30 uppercase tracking-widest">
              System_Blueprint.md
            </div>
          </div>

          <img
            src="/blueprint.png"
            alt="System Blueprint"
            className="w-full h-auto rounded-b opacity-90"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          {/* Scanning Line for Step 3 ("We go back to it") */}
          {step === 3 && (
            <motion.div
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-1 bg-white shadow-[0_0_20px_rgba(255,255,255,1)] z-30"
            />
          )}
        </div>

        {/* Step 4: The Foundation */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{
            opacity: step >= 4 ? 1 : 0,
            width: step >= 4 ? "100%" : "0%",
          }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="h-6 bg-white mt-8 rounded-sm max-w-4xl w-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          <span className="text-black font-black uppercase tracking-widest text-xs">
            The Foundation
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
