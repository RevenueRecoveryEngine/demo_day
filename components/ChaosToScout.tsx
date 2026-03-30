"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldAlert, Cpu, Sparkles, Activity } from "lucide-react";

export function ChaosToScout({ step }: { step: number }) {
  const stage = step === 0 ? "chaos" : "system";

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020617] px-6 font-sans">
      {/* Background Grid & Dynamic Gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[120px] pointer-events-none opacity-40 mix-blend-screen"
        animate={{
          background:
            stage === "chaos"
              ? "radial-gradient(circle, rgba(220,38,38,0.2) 0%, transparent 60%)"
              : "radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(56,189,248,0.1) 60%, transparent 80%)",
        }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />

      <div className="relative w-full max-w-6xl h-[600px] flex items-center justify-center">
        {/* CHAOS STATE */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          initial={false}
          animate={{
            opacity: stage === "chaos" ? 1 : 0,
            scale: stage === "chaos" ? 1 : 1.2,
            filter: stage === "chaos" ? "blur(0px)" : "blur(20px)",
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ pointerEvents: stage === "chaos" ? "auto" : "none" }}
        >
          <div className="flex flex-col items-center -mt-10 mb-16">
            <motion.h2 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)] uppercase mb-2">
              The Web is Chaos
            </motion.h2>
            <p className="text-red-400/60 font-mono tracking-widest text-sm uppercase">Unstructured • Volatile • Deceptive</p>
          </div>

          <div className="flex items-center justify-center gap-16 w-full relative">
            <div className="text-5xl font-mono text-white/5 tracking-widest uppercase font-black transform -rotate-90 absolute -left-20">
              Input
            </div>

            <div className="relative w-[500px] h-[350px] border border-red-900/30 rounded-3xl bg-red-950/10 backdrop-blur-md overflow-hidden flex items-center justify-center shadow-[inset_0_0_60px_rgba(220,38,38,0.05)]">
              {/* Messy floating nodes */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute border border-red-500/30 rounded-lg bg-gradient-to-br from-red-500/10 to-transparent backdrop-blur-sm flex items-center justify-center"
                  style={{
                    width: Math.random() * 40 + 20,
                    height: Math.random() * 40 + 20,
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    x: [0, (Math.random() - 0.5) * 100, 0],
                    y: [0, (Math.random() - 0.5) * 100, 0],
                    rotate: [0, (Math.random() - 0.5) * 360, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Activity className="w-4 h-4 text-red-500/40" />
                </motion.div>
              ))}
              
              <motion.div 
                className="absolute inset-0 border border-red-500/20 rounded-3xl"
                animate={{ opacity: [0.1, 0.5, 0.1] }}
                transition={{ duration: 0.1, repeat: Infinity, repeatType: "reverse" }}
              />

              <div className="z-10 bg-black/80 px-8 py-4 rounded-xl border border-red-500/50 shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                <span className="text-red-500 font-bold tracking-widest uppercase text-xl flex items-center gap-3">
                  <ShieldAlert className="w-6 h-6 animate-pulse" />
                  Data Corruption
                </span>
              </div>
            </div>

            <div className="text-5xl font-mono text-red-500/20 tracking-widest uppercase font-black transform rotate-90 absolute -right-20">
              Output
            </div>
          </div>
        </motion.div>

        {/* SYSTEM STATE */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={false}
          animate={{
            opacity: stage === "system" ? 1 : 0,
            scale: stage === "system" ? 1 : 0.9,
            filter: stage === "system" ? "blur(0px)" : "blur(20px)",
          }}
          transition={{
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
            delay: stage === "system" ? 0.2 : 0,
          }}
          style={{ pointerEvents: stage === "system" ? "auto" : "none" }}
        >
          <div className="flex flex-col items-center -mt-10 mb-16">
            <motion.h2 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 drop-shadow-[0_0_20px_rgba(139,92,246,0.5)] uppercase mb-2">
              Decision Engine
            </motion.h2>
            <p className="text-violet-300/60 font-mono tracking-widest text-sm uppercase">Structured • Deterministic • Verified</p>
          </div>

          <div className="flex items-center justify-center gap-12 w-full relative">
            {/* Input Node */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center relative overflow-hidden group shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-white/40 font-mono font-bold tracking-widest uppercase relative z-10">URL</span>
              </div>
            </div>

            {/* Connection Flow 1 */}
            <div className="flex flex-col items-center justify-center relative w-32 h-2">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-50 blur-sm" />
              <div className="w-full h-px bg-gradient-to-r from-white/10 via-violet-400 to-violet-500/20 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent"
                  animate={{ x: ["-100%", "300%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <ArrowRight className="absolute right-0 text-violet-400 w-5 h-5 translate-x-1/2 bg-[#020617] rounded-full" />
            </div>

            {/* Central Engine */}
            <motion.div
              className="relative px-12 py-10 rounded-3xl border border-violet-500/50 bg-[#060b1f]/80 backdrop-blur-2xl z-10 overflow-hidden flex flex-col items-center"
              animate={{
                boxShadow: [
                  "0 0 40px rgba(139,92,246,0.1), inset 0 0 20px rgba(139,92,246,0.1)",
                  "0 0 80px rgba(139,92,246,0.3), inset 0 0 40px rgba(139,92,246,0.2)",
                  "0 0 40px rgba(139,92,246,0.1), inset 0 0 20px rgba(139,92,246,0.1)",
                ],
                borderColor: ["rgba(139,92,246,0.5)", "rgba(167,139,250,0.8)", "rgba(139,92,246,0.5)"],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-blue-600/10 to-transparent" />
              
              {/* Scanning laser line */}
              <motion.div 
                className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent z-20 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-violet-500/20 p-4 rounded-full mb-4 border border-violet-500/30">
                  <Cpu className="w-10 h-10 text-violet-300" strokeWidth={1.5} />
                </div>
                <div className="text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] filter">
                  SCOUT
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-950/50 border border-violet-500/30 mt-2">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  <span className="text-xs font-mono text-violet-300 tracking-[0.2em] uppercase font-bold text-shadow-sm">
                    Intelligence Layer
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Connection Flow 2 */}
            <div className="flex flex-col items-center justify-center relative w-32 h-2">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50 blur-[2px]" />
              <div className="w-full h-px bg-gradient-to-r from-violet-500/20 via-emerald-400 to-emerald-500/20 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent"
                  animate={{ x: ["-100%", "300%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                />
              </div>
              <ArrowRight className="absolute right-0 text-emerald-400 w-5 h-5 translate-x-1/2 bg-[#020617] rounded-full" />
            </div>

            {/* Output Node */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-2xl border border-emerald-500/40 bg-emerald-950/30 backdrop-blur-xl flex items-center justify-center relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
                <motion.div
                  className="absolute inset-0 border-[2px] border-emerald-400/50 rounded-2xl"
                  animate={{ scale: [1, 1.1, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-emerald-400 font-mono font-bold tracking-widest text-sm uppercase relative z-10 text-center drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">
                  Clean<br/>Data
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Persistent Footer Hint */}
      <div className="absolute bottom-8 w-full flex justify-center z-50 pointer-events-none">
        <motion.div 
          className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <span className="text-white/40 text-[10px] tracking-widest uppercase font-semibold">
            Navigate Presentation
          </span>
          <kbd className="px-2.5 py-1 rounded border border-white/10 bg-black/40 font-mono text-white/60 shadow-inner text-xs">
            Space
          </kbd>
        </motion.div>
      </div>
    </div>
  );
}

