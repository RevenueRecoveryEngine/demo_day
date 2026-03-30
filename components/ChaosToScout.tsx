"use client";
// components/ChaosToScout.tsx — Slide 1: Chaos -> Decision System

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function ChaosToScout({ step }: { step: number }) {
  const stage = step === 0 ? "chaos" : "system";

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030712] px-6">
      {/* Background Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        animate={{
          background:
            stage === "chaos"
              ? "radial-gradient(circle, rgba(239,68,68,0.05) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
        }}
        transition={{ duration: 1.5 }}
      />

      {/* Main visualization area */}
      <div className="relative w-full max-w-5xl h-[500px] flex items-center justify-center">
        {/* CHAOS STATE */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: stage === "chaos" ? 1 : 0,
            scale: stage === "chaos" ? 1 : 0.8,
            filter: stage === "chaos" ? "blur(0px)" : "blur(10px)",
          }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ pointerEvents: stage === "chaos" ? "auto" : "none" }}
        >
          <div className="flex items-center justify-center gap-12 w-full">
            <div className="text-3xl font-mono text-white/50 tracking-widest uppercase">
              URL
            </div>

            <div className="relative w-[400px] h-[300px]">
              {/* Messy nodes */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-12 h-12 border border-red-500/40 rounded bg-red-500/10"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${20 + Math.sin(i * 100) * 40}%`,
                  }}
                  animate={{
                    x: [0, Math.random() * 20 - 10, 0],
                    y: [0, Math.random() * 20 - 10, 0],
                    rotate: [0, Math.random() * 20 - 10, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))}
              {/* Broken lines */}
              <svg className="absolute inset-0 w-full h-full opacity-40">
                <motion.path
                  d="M0,150 Q100,50 200,250 T400,100"
                  stroke="#ef4444"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  animate={{ strokeDashoffset: [0, -100] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                  d="M50,200 Q150,300 250,50 T400,250"
                  stroke="#ef4444"
                  strokeWidth="1"
                  fill="none"
                  animate={{ strokeDashoffset: [0, -50] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </svg>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500/80 font-bold tracking-widest uppercase drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                Chaos
              </div>
            </div>

            <div className="text-3xl font-mono text-red-500/50 tracking-widest uppercase">
              Broken
            </div>
          </div>
        </motion.div>

        {/* SYSTEM STATE */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: stage === "system" ? 1 : 0,
            scale: stage === "system" ? 1 : 1.1,
            filter: stage === "system" ? "blur(0px)" : "blur(10px)",
          }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
            delay: stage === "system" ? 0.3 : 0,
          }}
          style={{ pointerEvents: stage === "system" ? "auto" : "none" }}
        >
          <div className="flex items-center justify-center gap-16 w-full">
            <div className="text-3xl font-mono text-white tracking-widest uppercase">
              URL
            </div>

            <div className="flex items-center gap-2">
              <div className="w-16 h-0.5 bg-gradient-to-r from-white/20 to-violet-500/50 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-violet-400"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
              <ArrowRight className="w-6 h-6 text-violet-400" />
            </div>

            <motion.div
              className="relative px-16 py-12 rounded-2xl border border-violet-500 bg-[#030712] z-10"
              animate={{
                boxShadow: [
                  "0 0 40px rgba(139,92,246,0.2)",
                  "0 0 80px rgba(139,92,246,0.4)",
                  "0 0 40px rgba(139,92,246,0.2)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/10 to-blue-600/10" />
              <div className="text-5xl font-bold tracking-widest text-white mb-2 text-center drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                SCOUT
              </div>
              <div className="text-sm font-mono text-violet-400 tracking-[0.3em] text-center uppercase">
                Decision System
              </div>
            </motion.div>

            <div className="flex items-center gap-2">
              <div className="w-16 h-0.5 bg-gradient-to-r from-violet-500/50 to-emerald-500/50 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-emerald-400"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
              </div>
              <ArrowRight className="w-6 h-6 text-emerald-400" />
            </div>

            <div className="text-3xl font-mono text-emerald-400 tracking-widest uppercase drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]">
              Data
            </div>
          </div>
        </motion.div>
      </div>

      {/* Keyboard Hint */}
      <div className="absolute bottom-12 flex items-center justify-center w-full z-50">
        <span className="text-white/30 text-xs tracking-wider uppercase flex items-center gap-3 font-semibold">
          Press Space / Arrow Down to continue{" "}
          <kbd className="px-2 py-0.5 rounded border border-white/10 bg-white/10 font-mono text-white/50 shadow-inner">
            →
          </kbd>
        </span>
      </div>
    </div>
  );
}
